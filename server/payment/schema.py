
import graphene
from graphql_jwt.decorators import login_required
import stripe

from store.models import Cart, CartItem
from store.schema import CartType


from decouple import config
stripe.api_key = config('STRIPE_KEY')


class Pay(graphene.Mutation):
    success = graphene.Boolean()
    errors = graphene.String()
    cart = graphene.Field(CartType)

    class Arguments:
        token = graphene.String(required=True)

    @login_required
    def mutate(self, info, token):
        cart = Cart.objects.get(belongsTo=info.context.user)
        token = stripe.Token.retrieve(token)
        charge = stripe.Charge.create(
            amount=int(cart.total * 100), source=token, currency='USD')

        cartItem = CartItem.objects.filter(cart=cart)
        cartItem.delete()
        cart.total = 0
        cart.save()

        return Pay(success=True, cart=cart)


class Mutation(graphene.ObjectType):
    pay = Pay.Field()
