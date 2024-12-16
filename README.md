# MeetPoint: Red Social de Eventos

### Nuestro proyecto consiste en una red social de eventos que permite a los usuarios descubrir, organizar y participar en eventos sociales. Los usuarios pueden crear eventos, registrarse para asistir a estos e interactuar a través de comentarios. La plataforma clasifica los eventos por categorías, facilita la gestión de asistencias y ofrece un espacio para la interacción social en torno a eventos de interés común.

## Características de usuario

- Crear, editar y eliminar eventos.

- Registrar asistencias en los eventos vigentes.

- Crear, editar y eliminar comentarios y respuestas.

- Editar características de cuenta como nombre, email, dirección y contraseña.

- Eliminar cuenta.

- Calificar por medio de un rating de estrellas los eventos asistidos.

- Reportar otros usuarios.

- Adquirir una membresía de pago con ventajas adicionales.

- Sistema de autenticación y autorización.

## Características de administrador

- Dashboard de control con toda la información de la aplicación.

- Crear, editar y eliminar TODOS los eventos, categorías, asistencias, comentarios y cuentas de usuarios.

- Visualizar y administrar todos los reportes.

- Bloquear cuentas de usuarios.

- Sistema de autenticación y autorización.

## Tecnologías Utilizadas

![C#](https://img.shields.io/badge/Language-C%23-blue)
![ASP.NET Core](https://img.shields.io/badge/Framework-ASP.NET%20Core-blue)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-darkgreen)
![React](https://img.shields.io/badge/Framework-React-darkgreen)
![SQL Server](https://img.shields.io/badge/Database-SQL%20Server-orange)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/AnthonyEMF/meetpoint.git
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Corre el proyecto:

   ```bash
   npm run dev
   ```

4. Migración de la base de datos:

   ```bash
   add-migration Init
   update-database
   ```

## Estado del Proyecto

Actualmente en desarrollo.  
Implementación de nuevos endpoints para obtener el estado de membresía y rating de un usuario.  
Cambiar los hooks existentes a store con zustand e implementación de formik.  
Validar que solo se permita el registro para personas mayores de edad.  
Agregar más ventajas para la membresía de pago.

## Autores

- Anthony Miranda - [@AnthonyEMF](https://github.com/AnthonyEMF)
- Danilo Vides - [@IsaacV04](https://github.com/IsaacV04)
