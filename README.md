# Proyecto de Gestión de Empleados

Este proyecto consiste en un sistema para gestionar empleados, incluyendo operaciones CRUD, autenticación basada en tokens, integración con un sistema de envío de correos automatizado y una interfaz de usuario desarrollada en React con Material-UI.

# Especificaciones del Backend

Tecnologías Utilizadas
Python
Django REST Framework
PostgreSQL
SendGrid (para el sistema de envío de correos)
Configuración del Entorno Virtual de Python

Instalación de PostgreSQL en macOS con Homebrew
brew update
brew install postgresql

Iniciar PostgreSQL y crear la base de datos y usuario
psql postgres
CREATE DATABASE nombreBaseDatos;
CREATE USER nombreUsuario WITH PASSWORD 'contraseña';
GRANT ALL PRIVILEGES ON DATABASE nombreBaseDatos TO nombreUsuario;
\q

Crear y activar el entorno virtual

virtualenv <nombre_entorno>

En sistemas Unix
source <nombre_entorno>/bin/activate 

En Windows
<nombre_entorno>\Scripts\activate  

# Instalar las dependencias

pip install -r requirements.txt
pip install django
pip install djangorestframework
pip install psycopg2
pip install djangorestframework_simplejwt
pip install django-cors-headers
pip install coreapi
pip install sendgrid

Iniciar el servidor de desarrollo de Django
python manage.py runserver

Comandos Útiles de Django

Crea una nueva aplicación Django.
python manage.py startapp <nombre_app> 

Crea archivos de migración basados en los cambios en los modelos
python manage.py makemigrations

Aplica las migraciones pendientes.
python manage.py migrate

Crea un superusuario para acceder al panel de administración de Django.
python manage.py createsuperuser 


# Especificaciones del Frontend

Tecnologías Utilizadas
React + vite
npm create vite 

Material-UI
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material


Instalacion de dependencias
npm install

Ejecución del Servidor de Desarrollo
npm run dev

Configuración de SendGrid
Se requiere configurar las credenciales de SendGrid en el archivo .env.

Api Key
SENDGRID_API_KEY=your_sendgrid_api_key

Lo anterior es para que el usuario sepa que se instalo en la elaboracion del proyecto pero para correrlo no tiene que instalar todo de nuevo
puede instalar dependencias y ejecutar una serie de comandos para 
mayor agilidad


Como correr el proyecto cuando se baja de github

Crear un entorno virtual (opcional pero recomendado)
python -m venv venv
Activar el entorno virtual
source venv/bin/activate  # Para sistemas Unix
venv\Scripts\activate.bat  # Para Windows
Instalar las dependencias
pip install -r requirements.txt

python manage.py migrate

PD: el superuser que creas es para acceder en el login del proyecto debido a que las entidades ninguna tiene atributos de username y password, recomiendo usar un usuario sencillo, puede ser username: "root", password: "root"

python manage.py createsuperuser

python manage.py runserver

Para el cliente en React

npm install
npm run dev
