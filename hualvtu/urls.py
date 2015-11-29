from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hualvtu.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'gallery.views.index', name='home'),
    url(r'^index$', 'gallery.views.index', name='index'),
    url(r'^gallery/', include('gallery.urls',)),
)
