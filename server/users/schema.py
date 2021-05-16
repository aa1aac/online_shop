from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
import graphene


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude_fields = ('last_login', 'pk', 'password',
                          'isSeller', 'is_staff', 'is_superuser', 'is_active', 'username', 'date_joined', 'item_set')


class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        return info.context.user
