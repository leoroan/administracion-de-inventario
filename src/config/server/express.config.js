// express-config.js
import express from 'express';
import session from 'express-session';
import handlebars from "express-handlebars";
import cors from 'cors';
import __dirname from "../../utils.js";
import { addLogger } from "../../middlewares/logger.middleware.js";
import equiposInformaticosExtendRouter from '../../routes/equiposInformaticos.router.js';
import empleadoExtendRouter from '../../routes/empleado.router.js';
import marcaEquipoExtendRouter from '../../routes/marcaEquipo.router.js';
import ModeloEquipoRouter from '../../routes/modeloEquipo.router.js';
import viewsRouter from '../../routes/views.router.js';

export default function configureExpress(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(addLogger);

  app.engine("hbs",
    handlebars.engine({
      extname: "hbs",
      defaultLayout: "main",
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
    })
  );

  app.set("view engine", "hbs");
  app.set("views", `${__dirname}/views`);
  app.use(express.static(`${__dirname}/public`));
  app.use(session({
    secret: 'mtInventory',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //  en producción cambia esto a true
      maxAge: 1800000,
      // httpOnly: true, // Agrega este header para mayor seguridad
      // sameSite: 'strict' // Agrega este header para mayor seguridad
    }
  }));

  app.get('/loggerTest', (req, res) => {
    req.logger.debug('Test - DEBUG')
    req.logger.http('Test - HTTP')
    req.logger.info('Test - INFO')
    req.logger.warning('Test - WARNING')
    req.logger.error('Test - ERROR')
    req.logger.fatal('Test - FATAL')
    res.send({ status: 200, message: 'Logger test' })
  })

  //APIS
  const equiposInformaticos = new equiposInformaticosExtendRouter();
  const empleados = new empleadoExtendRouter();
  const marcaEquipo = new marcaEquipoExtendRouter();
  const modeloEquipo = new ModeloEquipoRouter();
  app.use("/api/equipos", equiposInformaticos.getRouter());
  app.use("/api/marcas/", marcaEquipo.getRouter());
  app.use("/api/modelos/", modeloEquipo.getRouter());
  app.use("/api/empleados", empleados.getRouter());

  //routes here, before *
  //VISTAS
  const vistas = new viewsRouter();
  app.use("/", vistas.getRouter());

  // app.get('*', (req, res) => {
  //   req.logger.error('error 404 - PAGE NOT FOUND')
  //   res.status(404).render("error404");
  // });

}
