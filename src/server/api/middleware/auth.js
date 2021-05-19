/**
 * Creating Authentication middleware
 */

// imports
import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';

// init dotenv
dotenv.config();

// initialise passport
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// define options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

// use passport
passport.use(
  new JwtStrategy(opts, async (jwtData, done) => {
    try {
      console.info(`${jwtData.email} does an authenticated request`);
      return done(null, jwtData);
    } catch (error) {
      done(null, error);
    }
  })
);

export default (req, res, next) => {
  if ((req.method == 'POST' && req.baseUrl == '/users')||(req.method == 'GET' && req.baseUrl == '/products')) {
    // we no need authentication on get requests
    next();
  } else {
    // authenticate user
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error || !user) {
        console.error(info);
        res.status(401).send(info);
      } else {
        req.userId = user.user_id;
        req.pass = user.password;
        req.email = user.email;
        console.log(req.userId);
        next();
      }
    })(req, res, next);
  }
};
