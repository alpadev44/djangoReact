
from rest_framework import viewsets
from .serializer import EmpleadoSerializer
from .models import Empleado

class EmpleadoView(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()