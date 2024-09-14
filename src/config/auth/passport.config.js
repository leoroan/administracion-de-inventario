import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';
import { Empleado } from '../../services/db/models/Empleado.model.js';
import { createHash, isValidPassword } from '../../utils/bcrypt.js';
import { PRIVATE_KEY } from '../../utils/jwt.js';
import { devLogger } from '../logger/logger.config.js';

//  Declaramos estrategia
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

  passport.use('register', new localStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
      const { nombre, apellido, dni, email } = req.body;
      try {
        const exist = await User.findOne({ where: { username } });
        if (exist) {
          done(null, false)
        }
        const employee = {
          username,
          password: createHash(password),
          nombre,
          apellido,
          dni,
          email
        }
        const result = await Empleado.create(employee);
        return done(null, result)
      } catch (error) {
        return done("Registration ERROR " + error);
      }
    }
  ))

  //Estrategia de Login:
  passport.use('login', new localStrategy({ passReqToCallback: true, usernameField: 'username' },
    async (req, username, password, done) => {
      try {
        const employee = await Empleado.findOne({ where: { username } });
        if (!employee) {
          devLogger.warning("User doesn't exists with username: " + username);
          return done(null, false);
        }
        if (!isValidPassword(employee.dataValues, password)) {
          devLogger.warning("Invalid credentials for employee: " + username);
          return done(null, false);
        }

        const userDTO = {
          id: employee.dataValues.id,
          username: employee.dataValues.username,
          rol: employee.dataValues.rol,
          nombre: employee.nombre,
          apellido: employee.apellido,
          email: employee.email
        };

        return done(null, userDTO);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((employee, done) => {
    done(null, employee.id)
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let employee = await Empleado.findOne({ where: { id } });
      done(null, employee)
    } catch (error) {
      devLogger.error("Error deserializando el usuario: " + error);
    }
  });
};

const cookieExtractor = req => {
  let token = null;
  if (process.env.USE_POSTMAN) {
    if (req && req.cookies) { // this for postman
      token = req.cookies['jwtCookieToken'];
    }
  } else {
    if (req && req.headers) {  // this for browser
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        token = authHeader.split(' ')[1];
      }
    }
  }
  return token;
};

export default initializePassport;