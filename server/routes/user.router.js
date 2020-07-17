const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const { query } = require('../modules/pool');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const fullname = req.body.fullname;
  const username = req.body.username;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`;
  pool
    .query(queryText, [fullname, username, email, password])
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(500).send(error));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/update', rejectUnauthenticated, (req, res) => {
  const bio = req.body.bio;
  const queryText = `UPDATE "user" SET bio = $1 WHERE id = $2;`;
  pool
    .query(queryText, [bio, req.user.id])
    .then(result => res.sendStatus(204))
    .catch(error => console.log(error));
});

router.delete('/delete', rejectUnauthenticated, (req, res) => {
  const queryText = `
    DELETE FROM "user" WHERE id = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.sendStatus(200))
    .catch(error => console.log(error));
});

router.get('/:id', (req, res ) => {
  const queryText = `
    SELECT id, fullname, username, avatar_url, bio FROM "user"
      WHERE id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

module.exports = router;
