const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const router = express.Router();

router.get('/:search', (req, res) => {
  const search = req.params.search;
  const queryText = `
    SELECT fullname, username, avatar_url, bio FROM "user"
      WHERE username ILIKE $1 OR fullname ILIKE $1
      ORDER BY fullname DESC LIMIT 25;`;
  pool
    .query(queryText, [`%${search}%`])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

router.get('/list/:id', (req, res) => {
  const queryText = `
    SELECT "refUser".fullname, array_agg("refFriend".fullname) AS "friends" FROM friend
      JOIN "user" AS "refUser" ON "refUser".id = friend.user_id
      JOIN "user" AS "refFriend" ON "refFriend".id = friend.friend_id
      WHERE "refUser".id = $1
      GROUP BY "refUser".fullname;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

module.exports = router;