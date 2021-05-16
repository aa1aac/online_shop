import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from .models import Cart, Item, CartItem
from graphql_jwt.decorators import user_passes_test, login_required
from django.db.models import Q


class ItemType(DjangoObjectType):
    class Meta:
        model = Item


class CartType(DjangoObjectType):
    class Meta:
        model = Cart


class CartItemType(DjangoObjectType):
    class Meta:
        model = CartItem
        exclude_fields = ('sold', 'cart')


class Query(graphene.ObjectType):
    items = graphene.List(ItemType, first=graphene.Int(),
                          skip=graphene.Int(), search=graphene.String())

    # my_items = graphene.List(ItemType, first=graphene.Int(),
    #                          skip=graphene.Int(), search=graphene.String())

    # cart = graphene.Field(CartType,)

    @login_required
    def resolve_cart(self, info):
        try:
            cart = Cart.objects.get(belongsTo=info.context.user)
            return cart
        except Cart.DoesNotExist:
            cart = Cart(belongsTo=info.context.user)
            return cart

    def resolve_items(self, _, search=None, first=None, skip=None, **kwargs):
        if search:
            filter = (
                Q(item_name__icontains=search),
                Q(description__icontains=search))

            items = Item.objects.filter(filter)
        else:
            items = Item.objects.all()

        if skip:
            items = items[skip:]

        if first:
            items = items[:first]

        return items

    # @user_passes_test(lambda user: user.isSeller)
    # def resolve_my_items(self, info, skip=None, first=None, search=None):
    #     if search:
    #         filter = (
    #             Q(item_name__icontains=search),
    #             Q(description__icontains=search),
    #             Q(seller=info.context.user))

    #         items = Item.objects.filter(filter)
    #     else:
    #         items = Item.objects.filter(seller=info.context.user)

    #     if skip:
    #         items = items[skip:]

    #     if first:
    #         items = items[:first]

    #     return items


class UploadItem(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        item_name = graphene.String(required=True)
        price = graphene.Float(required=True)
        description = graphene.String(required=True)
        images = graphene.List(graphene.String, required=True)
        coverImage = graphene.String(required=True)

    @user_passes_test(lambda user: user.isSeller)
    @login_required
    def mutate(self, info,  item_name, price, description, images, coverImage):
        item = Item(item_name=item_name, price=price,
                    description=description, images=images, cover_image=coverImage, seller_id=info.context.user.id)

        item.save()
        return UploadItem(success=True)


class AddToCart(graphene.Mutation):
    cart = graphene.Field(CartType)

    class Arguments:
        id = graphene.String(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            cart = Cart.objects.get(belongsTo=info.context.user)

            try:
                item = CartItem.objects.get(item=id, cart=cart)
                return GraphQLError('the item already exists in your cart')

            except CartItem.DoesNotExist:
                cartItem = CartItem(
                    cart=cart, item=Item.objects.get(id=id))
                cartItem.save()

        except Cart.DoesNotExist:
            cart = Cart(belongsTo=info.context.user)
            cart.save()

            try:
                cart_item = CartItem.objects.get(item=id, cart=cart)
                if cart_item:
                    return GraphQLError('the item already exists in your cart')

            except CartItem.DoesNotExist:
                cartItem = CartItem(cart=cart, item=Item.objects.get(id=id))
                cartItem.save()

        return AddToCart(cart=cart)


class Mutation(graphene.ObjectType):
    # upload_item = UploadItem.Field()
    add_to_cart = AddToCart.Field()
