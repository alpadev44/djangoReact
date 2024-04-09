from rest_framework import serializers
from .models import Telefono

class TelefonoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Telefono
        fields = '__all__'
