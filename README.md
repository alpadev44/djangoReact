

# Proyecto de Gestión de Empleados

Este proyecto consiste en un sistema para gestionar empleados, incluyendo operaciones CRUD, autenticación basada en tokens, integración con un sistema de envío de correos automatizado y una interfaz de usuario desarrollada en React con Material-UI.

## Especificaciones del Backend

### Tecnologías Utilizadas
- Python
- Django REST Framework
- PostgreSQL
- SendGrid (para el sistema de envío de correos)

### Configuración del Entorno

#### Instalación de PostgreSQL en macOS con Homebrew

```bash
brew update
brew install postgresql
```

#### Configuración de PostgreSQL

```bash
# Iniciar PostgreSQL y crear la base de datos y usuario
psql postgres
CREATE DATABASE nombreBaseDatos;
CREATE USER nombreUsuario WITH PASSWORD 'contraseña';
GRANT ALL PRIVILEGES ON DATABASE nombreBaseDatos TO nombreUsuario;
\q
```

#### Crear y activar el entorno virtual

```bash
# Crear un entorno virtual
python -m venv venv
# Activar el entorno virtual
source venv/bin/activate  # En sistemas Unix
venv\Scripts\activate.bat  # En Windows
```

#### Instalación de dependencias de Python

```bash
pip install -r requirements.txt
```

#### Ejecución del servidor de desarrollo de Django

```bash
python manage.py runserver
```

#### Comandos Útiles de Django

- `python manage.py startapp <nombre_app>`: Crea una nueva aplicación Django.
- `python manage.py makemigrations`: Crea archivos de migración basados en los cambios en los modelos.
- `python manage.py migrate`: Aplica las migraciones pendientes.
- `python manage.py createsuperuser`: Crea un superusuario para acceder al panel de administración de Django.

## Especificaciones del Frontend

### Tecnologías Utilizadas
- React + Vite
- Material-UI

#### Instalación de dependencias de Node.js

#### estos los utilice cuando cree el proyecto
```bash 
npm i react-router-dom react-hot-toast axios react-hook-form react-draggable
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material
```

#### pero con este comando instalamos todo lo anterior
```bash 
npm install
```

#### Ejecución del servidor de desarrollo de React

```bash
npm run dev
```

## Configuración de SendGrid

Se requiere configurar las credenciales de SendGrid en el archivo `.env`.

```
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Correr el Proyecto

### Backend

1. Crear un entorno virtual y activarlo.
2. Instalar las dependencias de Python.
3. Ejecutar migraciones de Django.
4. Crear un superusuario.
5. Iniciar el servidor de desarrollo de Django.

### Frontend

1. Instalar las dependencias de Node.js.
2. Ejecutar el servidor de desarrollo de React.

---

Con esta estructura, la documentación queda más organizada y fácil de seguir, separando claramente las instrucciones para configurar el backend y el frontend del proyecto. Además, se proporcionan detalles específicos para la configuración de PostgreSQL y SendGrid.

# Documentacion del proyecto con core Api

### Endpoints
1. http://localhost:8000/empleados/docs/
2. http://localhost:8000/emails/docs/
3. http://localhost:8000/telefonos/docs/