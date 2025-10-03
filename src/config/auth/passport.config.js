import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';
import serviceInstances from '../../layers/services/servicesLoader.js';
import { isValidPassword } from '../../utils/bcrypt.js';
import { PRIVATE_KEY } from '../../utils/jwt.js';
import { devLogger } from '../logger/logger.config.js';
import { Op } from 'sequelize';

const localStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {

  passport.use('jwt', new JwtStrategy({ jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: PRIVATE_KEY },
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload.user);
      } catch (error) {
        devLogger.error(error);
        return done(error);
      }
    }
  ));

  passport.use("register", new localStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const { nombre, apellido, email, dni } = req.body;

    try {
      const exist = await serviceInstances.usuarioService.findOne({
        where: { [Op.or]: [{ email }, { username }] },
      });
      if (exist)
        return done(null, false, { message: "Nombre de usuario o correo ya existentes!" });

      const userData = {
        username,
        password,
        nombre,
        apellido,
        email,
        dni,
      };
      const usuario = await serviceInstances.usuarioService.create(userData);
      await serviceInstances.usuarioService.generateVerificationToken(usuario);

      let emailError = null;
      try {
        await serviceInstances.usuarioService.sendVerificationEmail(usuario);
      } catch (err) {
        emailError = err;
      }

      return done(null, { usuario, emailFailed: !!emailError });
    } catch (error) {
      return done(error);
    }
  }));

  passport.use('login', new localStrategy({ passReqToCallback: true, usernameField: 'username' },
    async (req, username, password, done) => {
      try {
        const user = await serviceInstances.usuarioService.findOne(
          { where: { [Op.or]: [{ email: username }, { username: username }] } },
          'loginScope'
        );

        if (!user) {
          devLogger.debug("No existe un usuario con este nombre de usuario: " + username);
          return done(null, false);
        }
        
        if (!user.emailVerificado) {
          return done(null, false, { message: 'Debes verificar tu correo antes de poder iniciar sesión.' });
        }

        if (!isValidPassword(user.dataValues, password)) {
          devLogger.debug("Credenciales invalidas para el usuario: " + username);
          return done(null, false);
        }
        if (user.bloqueado) {
          return done(null, false, { message: 'Usuario bloqueado' });
        }
        await user.update({ cantidadIntentosLoggin: 1, ultimoIngreso: new Date().toISOString() });
        const userDTO = {
          id: user.id,
          username: user.username,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rolPrincipal.nombre,
          bloqueado: user.bloqueado,
          ultimoIngreso: user.ultimoIngreso
        };

        return done(null, userDTO);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    if (!user || !user.id) {
      return done(new Error('Error en la serialización del usuario: los datos del usuario no válidos'));
    }
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await serviceInstances.usuarioService.findById(id);
      if (!user) {
        return done(new Error('Usuario no encontrado'));
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

const cookieExtractor = (req) => {
  const token = req.cookies?.jwtCookieToken || req.headers?.authorization?.split(' ')[1];
  return token;
};

export default initializePassport;