from django.db import models

# Create your models here.
class Empleado(models.Model):
    id = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    TIPO_IDENTIFICACION_CHOICES = (
        ('nit', 'NIT'),
        ('cc', 'Cédula de Ciudadanía'),
    )
    tipoIdentificacion = models.CharField(max_length=3, choices=TIPO_IDENTIFICACION_CHOICES)
    identificacion = models.CharField(max_length=20)
    fechaIngreso = models.DateField()
    salarioMensual = models.DecimalField(max_digits=10, decimal_places=2)
    cargo = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)