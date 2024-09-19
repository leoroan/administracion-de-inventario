import passport from 'passport';
import { generateJWToken } from "../utils/jwt.js";
import CustomRouter from "./custom/custom.router.js";
// import { registerMail } from '../controllers/nodemailer.controller.js';

export default class SessionExtendRouter extends CustomRouter {
  init() {
    this.post('/register', ["ADMIN", "SUPERVISOR"], passport.authenticate('register', {
      failureRedirect: '/session/fail-register'
    }), async (req, res) => {
      // registerMail(req, res);
      res.status(201).send({ status: "success", message: "User crated successfully" });
    })

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
        if (err) {
          return res.sendInternalServerError(info);
        }
        if (!user) {
          return res.sendInternalServerError(info);
        }

        req.logIn(user, (err) => {
          if (err) {
            return res.sendInternalServerError("Error logging in");
          }

          // Generamos el token JWT
          const { id, username, rol, nombre, apellido, email } = user;
          try {
            const access_token = generateJWToken({ id, username, rol, nombre, apellido, email });
            res.cookie('jwtCookieToken', access_token, { httpOnly: true });
            return res.status(201).send({ access_token: access_token });
          } catch (error) {
            console.error('Error on logging in:', error);
            return res.sendInternalServerError("Something went wrong, try again shortly!");
          }
        });
      })(req, res, next); 
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