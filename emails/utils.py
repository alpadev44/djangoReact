# utils.py

import os
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def enviar_correo_bienvenida(empleado_email, empleado_nombre, cargo, funciones):
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        from_email = settings.EMAIL_HOST_USER  # Usar el remitente configurado en Django
        to_email = empleado_email
        subject = "¡Bienvenido a nuestra empresa!"
        message = (
            f"¡Hola {empleado_nombre}!\n\n"
            f"Bienvenido a nuestra empresa. Nos alegra tenerte con nosotros.\n\n"
            f"Tu cargo es: {cargo}\n"
            f"Funciones específicas: {funciones}\n\n"
            "¡Te deseamos mucho éxito en tu nuevo rol!\n"
        )
        mail = Mail(from_email, to_email, subject, message)
        response = sg.send(mail)
        return True, f"Correo de bienvenida enviado a {empleado_email}"
    except Exception as e:
        return False, f"Error al enviar el correo de bienvenida: {str(e)}"

