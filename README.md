# Proyecto inventory management
## Dependencias del proyecto
*Librerías de Seguridad y Gestión de Sesiones*
- bcryptjs: Encriptación de contraseñas usando el algoritmo bcrypt.
- helmet: Protección contra vulnerabilidades comunes de HTTP.
- http-errors: Manejo de errores HTTP.
- passport: Framework de autenticación flexible.
- passport-jwt: Estrategia de autenticación basada en tokens JWT.
- passport-local: Estrategia de autenticación local basada en nombre de usuario y contraseña.

*Librerías de Base de Datos*
- mysql2: Conector para MySQL.
- sequelize: ORM para trabajar con diferentes bases de datos.

*Librerías de Envío de Correo Electrónico*
- nodemailer: Envío de correos electrónicos.

*Librerías de Gestión de Archivos y Generación de PDF*
- multer: Carga de archivos.
- pdfkit: Generación de documentos PDF.

*Librerías de Utilidad y Logging*
- commander: Creación de interfaces de línea de comandos.
- cookie-parser: Análisis de cookies.
- cors: Manejo de solicitudes CORS.
- dotenv: Carga de variables de entorno desde un archivo .env.
- express: Framework web para Node.js.
- express-session: Gestión de sesiones HTTP.
- jsonwebtoken: Generación y verificación de tokens JWT.
- uuid: Generación de UUIDs (Universally Unique Identifiers).
- winston: Logging de eventos.
- winston-daily-rotate-file: Rotación diaria de archivos de log.

*Otras Librerías*
- inventory-management-mintrp: Probablemente una librería personalizada o un módulo de proyecto.
- picocolors: Coloreado de texto en la consola.
- reflect-metadata: Decoradores para metadatos.

## Patrones Principales Implicados
*Patrón Modelo-Vista-Controlador (MVC):* -Sin implementacion de la vista
- Modelo: Corresponde a la capa de modelado (representando los datos y la lógica de negocio).
- Vista: Se encarga de la interfaz de usuario. ( La vista se genera en un componente aparte)
- Controlador: Maneja las solicitudes del usuario, interactúa con el modelo y actualiza la vista.

### Patrón Repositorio:
Repositorio: Actúa como una interfaz entre la capa de dominio (modelo) y la capa de datos (DAOs[^1]).
Abstrae el acceso a los datos, permitiendo cambios en la implementación de la base de datos sin afectar el resto de la aplicación.

### Patrón Capa de Servicio:
Encapsulan la lógica de negocio, exponiendo operaciones que pueden ser invocadas por otros componentes.
Ayudan a mantener la separación de preocupaciones y a crear una interfaz más granular para la capa de presentación.

### Patrón Unidad de Trabajo (Unit of Work):
(Generalmente asociado con el patrón Repositorio) Maneja un conjunto de cambios en una transacción.
Permite realizar múltiples operaciones sobre diferentes entidades y luego confirmarlas o deshacerlas como una sola unidad.

### Beneficios de esta Arquitectura
- Mantenibilidad: Facilita la modificación y ampliación del código.
- Reutilización: Los componentes pueden ser reutilizados en diferentes partes de la aplicación.
- Testabilidad: Permite realizar pruebas unitarias de forma aislada.
- Escalabilidad: La aplicación puede adaptarse a cambios en los requisitos.

#### version
v2.0.0

[^1]: DAO (Data Access Object): Actúa como una capa de acceso a datos más baja, a menudo directamente interactúa con la base de datos.