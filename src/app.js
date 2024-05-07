import express from 'express';
import configureExpress from './config/server/express.config.js';
import myDataSource from './config/db/typeorm.config.js';
import config from './config/config.js';
const SERVER_PORT = config.port;

const app = express();
configureExpress(app);

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

