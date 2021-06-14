// imports
import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import UsersDb from '../../lib/UsersDb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// init dotenv
dotenv.config();

// init router
const app = express.Router();

// init user database
const userData = new UsersDb();

// init passport
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        // get user by username
        const user = await userData.findOne(email);

        // check if user exists
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        // check if password is correct
        if (!(await isValidPassword(user, password))) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);

app.post('/login', (req, res) =>
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      });
      res.status(200).json({
        success: true,
        token: token,
        user: {
          id: user.user_id,
          email: user.email,
        },
      });
      
    }
  })(req, res));

export default app;

const isValidPassword = async (user, password) => {
  const match = await bcrypt.compare(password, user.password);
  return match;
};
