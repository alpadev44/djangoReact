from django.urls import path, include
from rest_framework import routers
from rest_framework.permissions import AllowAny
from rest_framework.documentation import include_docs_urls
from empleados  import views

router = routers.DefaultRouter()
router.register(r'empleados', views.EmpleadoView, 'empleados')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='empleados API', permission_classes=[AllowAny])),
]
