import passport from 'passport';
import CustomRouter from "./custom/custom.router.js";
import SessionController from '../controllers/session.controller.js';
import { devLogger } from '../config/logger/logger.config.js';
import { sessionService } from '../services/service.js';
import { generateJWToken } from "../utils/jwt.js";
// import { registerMail } from '../controllers/nodemailer.controller.js';

export default class SessionExtendRouter extends CustomRouter {
  init() {
    const sessionController = new SessionController(sessionService);

    this.post('/register', ["PUBLIC"], (req, res, next) => {
      passport.authenticate('register', (err, user, info) => {
        if (err) return res.status(500).json({ status: 'error', message: 'Internal server error: ' + err });
        if (!user) return res.status(400).json({ status: 'error', message: info.message });
        res.sendSuccess({ status: 'success', message: 'Registration successful' });
      })(req, res);
    });

    // this.post('/login', ['PUBLIC'], passport.authenticate('login', { failureRedirect: '/session/fail-login', failureMessage: true }), async (req, res) => {
    // this.post('/login', ['PUBLIC'], passport.authenticate('login', { failureMessage: true }), async (req, res) => {
    //   const user = req.user;
    //   if (!user) return res.status(401).send({ status: "error", error: "Wrong user/password credentials" });
    //   const { id, username, rol, nombre, apellido, email } = user;
    //   try {
    //     const access_token = generateJWToken({ id, username, rol, nombre, apellido, email });
    //     // req.session.user = { id, username, rol };
    //     res.cookie('jwtCookieToken', access_token, { httpOnly: true });//{ httpOnly: true, secure: true, sameSite: "strict", maxAge: 1800000, });
    //     res.status(201).send({ access_token: access_token });
    //   } catch (error) {
    //     console.error('Error on logging in:', error);
    //     res.status(500).send({ error: "Something went wrong, try again shortly!" });
    //   }
    // });

    this.post('/login', ['PUBLIC'], async (req, res, next) => {
      passport.authenticate('login', (err, user, info) => {
        if (err) return res.sendError(info);
        if (!user) return res.sendError(info);

        req.logIn(user, async (err) => {          
          if (err) return res.sendError("Error logging in");
          const { id, username, rol, email } = user;
          try {
            const access_token = generateJWToken({ id, username, rol, email });
            await sessionController.initSession(user, access_token);
            res.cookie('jwtCookieToken', access_token, { httpOnly: true });
            return res.sendSuccess({ access_token });
          } catch (error) {
            devLogger.error(error);
            return res.sendError("Something went wrong, try again shortly!");
          }
        });
      })(req, res);
    });

    this.post('/logout', ["PUBLIC"], async (req, res) => {
      try {
        const user = req.user;
        if (!user) {
          return res.status(401).send({ status: "error", error: "There were no user authenticated" });
        }
        res.clearCookie('jwtCookieToken');
        req.session.destroy(error => {
          if (error) {
            console.error('Error logging out:', error);
            return res.status(500).json({ error: 'Error logout', msg: "Error logging out" });
          }
          res.status(200).send('Logged out correctly!');
        });
      } catch (error) {
        console.error('Error al cerrar la sesión:', error);
        res.status(500).send({ error: "Something went wrong, try again shortly!" });
      }
    });
  }
}