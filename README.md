# 🗺️ MeetPoint
 Nuestro proyecto consiste en una red social de eventos que permite a los usuarios descubrir, organizar y participar en eventos sociales. Los usuarios pueden crear eventos, registrarse para asistir a estos e interactuar a través de comentarios. La plataforma clasifica los eventos por categorías, facilita la gestión de asistencias y ofrece un espacio para la interacción social en torno a eventos de interés común.

## 👤 Características de Usuario

- Crear, editar y eliminar eventos.

- Registrar asistencias en los eventos vigentes.

- Crear, editar y eliminar comentarios y respuestas.

- Editar características de cuenta como nombre, email, dirección y contraseña.

- Eliminar cuenta.

- Calificar por medio de un rating de estrellas los eventos asistidos.

- Reportar otros usuarios.

- Adquirir una membresía de pago con ventajas adicionales.

- Sistema de autenticación y autorización.

## 🛡️ Características de Administrador

- Dashboard de control con toda la información de la aplicación.

- Crear, editar y eliminar TODOS los eventos, categorías, asistencias, comentarios y cuentas de usuarios.

- Visualizar y administrar todos los reportes.

- Bloquear cuentas de usuarios.

- Sistema de autenticación y autorización.

## 💻 Tecnologías Utilizadas

- ASP.NET Core 8.0
- Node JS
- React
- Microsoft SQL Server
- Docker

## 🛠️ Instalación

Primero clona este repositorio:
   ```bash
   git clone https://github.com/AnthonyEMF/meetpoint.git MeetPoint
   ```

### ⚙️ Frontend:

1. Accede a la carpeta Frontend:

   ```bash
   cd MeetPoint/Frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el proyecto:

   ```bash
   npm run dev
   ```

### ⚙️ Backend:

1. Accede a la carpeta MeetPoint.API:

   ```bash
   cd MeetPoint/Backend/MeetPoint.API
   ```

2. Crea el archivo appsettings.json:

   ```bash
   New-Item appsettings.json 
   ```

3. Pega lo siguiente en appsettings.json (Los puertos pueden variar según tu equipo):

   ```bash
   {
      "ConnectionStrings": {
         "DefaultConnection": "Server=localhost,1433;Database=MeetPoint;User Id=sa;Password=YourStrong@Password123;Trusted_Connection=false;TrustServerCertificate=true;Encrypt=true;"
      },
      "AllowURLS": [
         "http://localhost:5173"
      ],
      "PageSize": 8,
      "JWT": {
         "ValidAudience": "http://localhost:5173",
         "ValidIssuer": "https://localhost:7191",
         "Secret": "Esta-es-una-clave-super-secreta-y-segura-para-JWT-con-al-menos-32-caracteres",
         "Expires": "120",
         "RefreshTokenExpire": "240"
      },
      "Logging": {
         "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
         }
      }
   }
   ```

4. Inicializa el contenedor de Docker que contiene la base de datos:

   ```bash
   docker-compose up -d
   ```

5. Instala las herramientas de Entity Framework (si no las tienes):

   ```bash
   dotnet tool install --global dotnet-ef
   ```

6. Restaura las dependencias del proyecto:

   ```bash
   dotnet restore
   ```

7. Creación y migración de la base de datos:

   ```bash
   dotnet ef migrations add InitDatabase
   dotnet ef database update
   ```

8. Ejecutar el proyecto:

   ```bash
   dotnet run dev
   ```

### 📋 Usuarios de prueba:

- Administrador: **admin@me.com**  
   Contraseña: **Temporal01***

- Usuario: user@me.com  
   Contraseña: **Temporal01***