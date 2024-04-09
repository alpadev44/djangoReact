from django.db import models
from empleados.models import Empleado

# Create your models here.
class Telefono(models.Model):
    id = models.AutoField(primary_key=True)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='telefonos')
    tipo = models.CharField(max_length=10)  # Ejemplo: Celular, Teléfono
    numero = models.CharField(max_length=20)
    indicativo = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.tipo}: {self.numero}"