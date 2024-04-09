from django.urls import path, include
from rest_framework import routers
from rest_framework.permissions import AllowAny
from rest_framework.documentation import include_docs_urls
from emails import views

router = routers.DefaultRouter()
router.register(r'emails', views.EmailView, 'emails')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='emails API', permission_classes=[AllowAny])),

]
