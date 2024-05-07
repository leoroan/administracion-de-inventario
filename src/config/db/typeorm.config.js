// typeorm.config.js
import { DataSource } from 'typeorm';

const myDataSource = new DataSource({
  type: 'postgres', // Tipo de base de datos (en este caso, PostgreSQL)
  host: 'localhost', // Host de la base de datos
  port: 5432, // Puerto de la base de datos
  username: 'postgres', // Usuario de la base de datos
  password: 'admin', // Contraseña de la base de datos
  database: 'typeORM', // Nombre de la base de datos
  entities: ['src/models/*.js'], // Ruta a tus entidades (modelos)
  logging: ["error"],
  synchronize: true, // Esto sincronizará tus modelos con la base de datos (solo en desarrollo, ¡cuidado en producción!)
});

export default myDataSource;
