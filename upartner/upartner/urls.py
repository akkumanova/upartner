from django.conf.urls import include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

import upartner.user.urls
import upartner.core.urls

urlpatterns = [
    url(r'^$', include(upartner.core.urls, namespace='core')),
    url(r'^login$', include(upartner.user.urls, namespace='upartner-user'))
]

urlpatterns += staticfiles_urlpatterns()