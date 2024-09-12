import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';
import { User } from '../../services/db/models/user.model.js';
import { createHash, isValidPassword } from '../../utils/bcrypt.js';
import { PRIVATE_KEY } from '../../utils/jwt.js';

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
        console.error(error);
        return done(error);
      }
    }
  ));

  passport.use('register', new localStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
      const { rol, nombre, apellido, dni } = req.body;
      try {
        const exist = await User.findOne({ where: { username } });
        if (exist) {
          done(null, false)
        }
        const user = {
          username,
          password: createHash(password),
          nombre,
          apellido,
          rol,
          dni
        }
        const result = await User.create(user)
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
        const user = await User.findOne({ where: { username } });
        if (!user) {
          console.warn("User doesn't exists with username: " + username);
          return done(null, false);
        }
        if (!isValidPassword(user.dataValues, password)) {
          console.warn("Invalid credentials for user: " + username);
          return done(null, false);
        }

        const userDTO = {
          id: user.dataValues.id,
          username: user.dataValues.username,
          rol: user.dataValues.rol,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email
        };

        return done(null, userDTO);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findOne({ where: { id } });
      done(null, user)
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
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