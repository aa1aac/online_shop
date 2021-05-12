import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from .models import Item
from graphql_jwt.decorators import user_passes_test, login_required
from django.db.models import Q


class ItemType(DjangoObjectType):
    class Meta:
        model = Item


class Query(graphene.ObjectType):
    items = graphene.List(ItemType, first=graphene.Int(),
                          skip=graphene.Int(), search=graphene.String(), myItems=graphene.Boolean())

    def resolve_items(self, info, search=None, first=None, skip=None, myItems=None, **kwargs):
        if search and myItems:
            filter = (
                Q(item_name__icontains=search),
                Q(description__icontains=search),
                Q(seller=info.context.user))

            items = Item.objects.filter(filter)

        elif search:
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


class Mutation(graphene.ObjectType):
    upload_item = UploadItem.Field()
