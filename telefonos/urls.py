from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from telefonos import views

router = routers.DefaultRouter()
router.register(r'telefonos', views.TelefonoView, 'telefonos')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='telefonos API')),
]
