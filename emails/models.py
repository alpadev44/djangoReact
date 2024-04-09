from django.db import models
from empleados.models import Empleado

# Create your models here.
class Email(models.Model):
    id = models.AutoField(primary_key=True)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='emails')
    email = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.email}"
