import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { addLogger } from '../../middlewares/logger.middleware.js'
import errorHandler from '../../middlewares/errorHandler.middleware.js'
import initializePassport from '../auth/passport.config.js'
import EmpleadoExtendRouter from '../../routes/empleado.router.js'
import MarcaExtendRouter from '../../routes/marca.router.js'
import ModeloExtendRouter from '../../routes/modelo.router.js'
import SessionExtendRouter from '../../routes/session.router.js'

export default function configureExpress(app) {
  initializePassport();

  const allowedOrigins = [
    process.env.FRONTEND_ORIGIN,
    // 'https://actasweb.vtv.gba.gob.ar',
  ];
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(addLogger)
  app.use(cookieParser('@ny1kN0wTh15?'))
  app.use(helmet());

  app.use(session({
    secret: 'MinTrpInv@202X',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.ENV_MODE === "DESARROLLO" ? false : true, //  en producción cambiar esto a true
      // sameSite: "strict",
      maxAge: 3600000
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // routes
  const empleadoRouter = new EmpleadoExtendRouter();
  const marcaRouter = new MarcaExtendRouter();
  const modeloRouter = new ModeloExtendRouter();
  const sessionRouter = new SessionExtendRouter()

  app.use('/api/empleados', empleadoRouter.getRouter());
  app.use('/api/marcas', marcaRouter.getRouter());
  app.use('/api/modelos', modeloRouter.getRouter());
  app.use('/api/session', sessionRouter.getRouter())

  app.use(errorHandler);

  app.get('/status', (req, res) => {
    res.sendStatus(200);
  });
}