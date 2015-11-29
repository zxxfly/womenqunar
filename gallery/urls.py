from django.conf.urls import patterns, include, url
from gallery import views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'L01_BootStrapDemo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.index),
    url(r'^index$', views.index),
    url(r'^welcome$', views.index),
    url(r'^main$', views.main),
    url(r'^detail/(?P<id>\d+)$', views.detail),

)


urlpatterns += staticfiles_urlpatterns()
