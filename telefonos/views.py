
from rest_framework import viewsets
from .serializer import TelefonoSerializer
from .models import Telefono

class TelefonoView(viewsets.ModelViewSet):
    serializer_class = TelefonoSerializer
    queryset = Telefono.objects.all()

