const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const pool = require('../db');
const initializePassport = require('../passport-config');

initializePassport(passport);

// Middleware
router.use(express.json());
router.use(passport.initialize());
router.use(passport.session());

// Middleware-like functions
function checkNotAuthenticated(req, res, next) {
  // This function is for allowing the request to go through only if the user is NOT authenticated.
  // I.e., A user should only be able to do things like post to register and login if they are not already logged in / authenticated.
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json('Unauthorized');
  }
}

function checkAuthenticated(req, res, next) {
  // This function basically let's the request go through only if the user is authenticated
  // E.g. See the request for logging a user out. I only want this route to be accessible if the
  // user is logged in, i.e., a user should not be able to logout if they are not already logged in.
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json('Unauthenticated.');
  }
}

// ===== Register a user ====== //
router.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // some validation
    const errors = [];
    if (!username || !email || !password) {
      errors.push({ message: 'Please enter all fields.' });
    }

    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$');
    if (!passwordRegex.test(password)) {
      errors.push({
        message:
          'Please make sure password is at least 8 characters, containing a mix of numbers and uppercase and lowercase letters.',
      });
    }

    // TEST
    const dupes = await pool.query('SELECT * FROM blog_user WHERE email= $1 OR username = $2', [
      email,
      username,
    ]);
    console.log(dupes.rows);

    if (errors.length) {
      res.json(errors);
    } else {
      // no errors
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO blog_user (username, email, hashed_password) VALUES ($1, $2, $3)',
        [username, email, hashedPassword]
      );
    }
    res.status(200).json('Successfully registered user');
  } catch (error) {
    res.status(500).json('Server error');
  }
});

// ===== Log a user in ===== //
router.post('/login', checkNotAuthenticated, passport.authenticate('local'), (req, res) => {
  res.status(200).json('Login successful.');
});

// ===== Log a user out ===== //
router.delete('/logout', checkAuthenticated, (req, res) => {
  req.logOut();
  res.status(200).json('Logout successful.');

  // I was having issues logging out until I added the line below req.logOut();
  // The answers from this post helped me solve the problem.
  // https://stackoverflow.com/questions/20547841/node-js-express-passport-cant-logout-user#answer-26693594

  // Most of the tutorials I watched used Express for views and therefore did things like
  // res.redirect(somewhere) upon successfully logging in, registering, logging out, etc. But I am
  // not using Express/ejs for views, so I don't redirect anywhere I simply send a response with a
  // status.
});

// ===== Edit a user ===== //
/*
router.post('/', checkAuthenticated, async (req, res) => {
  // make sure to check that the currently logged in user is only editing their own data
});
*/

// ===== Get a user ===== //
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query('SELECT username FROM blog_user WHERE username = $1', [
      username,
    ]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

module.exports = router;
