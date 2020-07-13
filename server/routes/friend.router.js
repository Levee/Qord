const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/requested/:id', (req, res) => {
  const queryText = `
    SELECT "refUser".fullname, array_agg("refFriend".fullname) AS "friends" FROM "friend"
      JOIN "user" AS "refUser" ON "refUser".id = "friend".user_id
      JOIN "user" AS "refFriend" ON "refFriend".id = "friend".friend_id
      WHERE "refUser".id = $1 AND "friend".confirmed = FALSE
      GROUP BY "refUser".fullname;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

router.get('/accepted/:id', (req, res) => {
  const queryText = `
    SELECT "refUser".fullname, array_agg("refFriend".fullname) AS "friends" FROM "friend"
      JOIN "user" AS "refUser" ON "refUser".id = "friend".user_id
      JOIN "user" AS "refFriend" ON "refFriend".id = "friend".friend_id
      WHERE "refUser".id = $1 AND "friend".confirmed = TRUE
      GROUP BY "refUser".fullname;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

module.exports = router;