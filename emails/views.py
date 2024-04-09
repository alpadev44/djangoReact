# views.py

from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import EmailSerializer
from .models import Email
from .utils import enviar_correo_bienvenida

class EmailView(viewsets.ModelViewSet):
    serializer_class = EmailSerializer
    queryset = Email.objects.all()

    def perform_create(self, serializer):
        # Guarda el objeto Email
        serializer.save()
        
        # Obtén el email_address del objeto serializer
        email_address = serializer.validated_data.get('email')
        
        # Obtén el nombre, cargo y funciones del objeto serializer o de donde corresponda
        empleado_nombre = serializer.validated_data.get('empleado_nombre')
        cargo = serializer.validated_data.get('cargo')
        funciones = serializer.validated_data.get('funciones')
        
        # Envía el correo de bienvenida
        if email_address and empleado_nombre and cargo and funciones:
            enviado, mensaje = enviar_correo_bienvenida(email_address, empleado_nombre, cargo, funciones)
            if enviado:
                return Response({'mensaje': mensaje}, status=201)
        return Response({'error': 'No se pudo enviar el correo de bienvenida'}, status=500)

