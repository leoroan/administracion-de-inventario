## ✅ Configuración de Multer
- Uso de memoryStorage(): Esto almacena los archivos en memoria (útil si luego quieres procesarlos sin escribir en disco).
- Filtro por tipos MIME permitidos (image/jpeg, image/png, image/webp): Esto es seguro y controlado.
- Límite de tamaño del archivo (2MB) y manejo personalizado de errores: Muy buena práctica.
- Uso de CustomError para errores controlados, lo que facilita la gestión de errores en toda la aplicación.

*El middleware upload.single() exportado es flexible y maneja errores de forma limpia, incluyendo el límite de tamaño y formatos no permitidos.*