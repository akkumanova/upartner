from django.conf.urls import include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from rest_framework import routers

from upartner.partner.api import PartnerList, PartnerDetail
from upartner.user.api import  CurrUserData

import upartner.user.urls
import upartner.core.urls

urlpatterns = [
    url(r'^'     , include(upartner.core.urls, namespace='core')),
    url(r'^login', include(upartner.user.urls, namespace='upartner-user'))
]

urlpatterns += staticfiles_urlpatterns()

router = routers.DefaultRouter()
#router.register(r'^partners$', PartnerList, base_name='partners')

urlpatterns += [
    url(r'^api/partners/$'               , PartnerList.as_view()) ,
    url(r'^api/partners/(?P<pk>[0-9]+)/$', PartnerDetail.as_view()),
    url(r'^api/users/current$'       , CurrUserData.as_view() ),
    url(r'^api-auth/'                , include('rest_framework.urls', namespace='rest_framework'))
]