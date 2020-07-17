const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get pending friend requests
router.get('/requested/:id', (req, res) => {
  const queryText = `
    SELECT "refUid1".fullname, array_agg("refUid2".fullname) AS "requests" FROM "request"
      JOIN "user" AS "refUid1" ON "refUid1".id = "request".uid1
      JOIN "user" AS "refUid2" ON "refUid2".id = "request".uid2
      WHERE "refUid1".id = $1 OR "refUid2".id = $1
      GROUP BY "refUid1".fullname;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

// get accepted friend requests (get friends)
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

router.post('/send', (req, res) => {
  let uid1 = req.body.uid1;
  let uid2 = req.body.uid2;
  if(req.body.uid1 > req.body.uid2) {
    uid1 = req.body.uid2;
    uid2 = req.body.uid1;
  }
  const queryText = `
    INSERT INTO "request" (uid1, uid2)
      VALUES ($1, $2);`;
  pool
    .query(queryText, [uid1, uid2])
    .then(result => res.sendStatus(200))
    .catch(error => res.sendStatus(500));
});

module.exports = router;