from django.conf.urls import include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers

import upartner.core.urls
import upartner.user.urls
from upartner.check.api import CheckFileViewSet
from upartner.file.api import FileViewSet
from upartner.nomenclature.api import CountryList, CountryDetail
from upartner.partner.api import PartnerViewSet, PartnerAccountViewSet
from upartner.partner.csv_api import PartnerCsvViewSet
from upartner.user.api import  UserViewSet

urlpatterns = [
    url(r'^'     , include(upartner.core.urls, namespace='core')),
    url(r'^login', include(upartner.user.urls, namespace='upartner-user'))
]

urlpatterns += staticfiles_urlpatterns()

router = routers.DefaultRouter()
router.register(r'api/partners'         , PartnerViewSet       )
router.register(r'api/partnerAccounts'  , PartnerAccountViewSet)
router.register(r'api/partnerInterfaces', PartnerCsvViewSet    )
router.register(r'api/users'            , UserViewSet          )

urlpatterns += router.urls

urlpatterns += [
     url(r'^api/nomenclatures/countries$'                 , CountryList.as_view()  ),
     url(r'^api/nomenclatures/countries/(?P<id>[0-9]+)$'  , CountryDetail.as_view()),
     url(r'^api-auth/'                , include('rest_framework.urls', namespace='rest_framework'))
]