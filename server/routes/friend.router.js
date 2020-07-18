const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get pending friend requests
router.get('/outgoing', (req, res) => {
  // const queryText = `
  //   SELECT array_agg(
  //     CASE
  //       WHEN "request".from = "refUid1".id THEN "refUid2".fullname
  //       WHEN "request".from = "refUid2".id THEN "refUid1".fullname
  //     END) AS "outgoing" FROM "request"
  //     JOIN "user" AS "refUid1" ON "refUid1".id = "request".uid1
  //     JOIN "user" AS "refUid2" ON "refUid2".id = "request".uid2
  //     JOIN "user" AS "isFrom" ON "isFrom".id = "request".from
  //     WHERE "request".from = $1
  //     GROUP BY "isFrom".fullname;`;
  const queryText = `
    SELECT array_agg(
      ARRAY[
        CASE
          WHEN "request".from = "refUid1".id THEN "refUid2".fullname
          WHEN "request".from = "refUid2".id THEN "refUid1".fullname
        END
        ,
        CASE
          WHEN "isFrom".id = "refUid1".id THEN CAST("refUid2".id AS VARCHAR)
          WHEN "isFrom".id = "refUid2".id THEN CAST("refUid1".id AS VARCHAR)
        END
      ]) AS "outgoing" FROM "request"
      JOIN "user" AS "refUid1" ON "refUid1".id = "request".uid1
      JOIN "user" AS "refUid2" ON "refUid2".id = "request".uid2
      JOIN "user" AS "isFrom" ON "isFrom".id = "request".from
      WHERE "request".from = $1
      GROUP BY "isFrom".fullname;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

router.get('/incoming', (req, res) => {
  const queryText = `
    SELECT array_agg(
      ARRAY[
        CASE
          WHEN "request".from <> "refUid1".id THEN "refUid2".fullname
          WHEN "request".from <> "refUid2".id THEN "refUid1".fullname
        END
        ,
        CASE
          WHEN "isFrom".id = "refUid1".id THEN CAST("refUid1".id AS VARCHAR)
          WHEN "isFrom".id = "refUid2".id THEN CAST("refUid2".id AS VARCHAR)
        END
      ]) AS "incoming" FROM "request"
      JOIN "user" AS "refUid1" ON "refUid1".id = "request".uid1
      JOIN "user" AS "refUid2" ON "refUid2".id = "request".uid2
      JOIN "user" AS "isFrom" ON "isFrom".id = "request".from
      WHERE "request".from <> $1 AND ("refUid1".id = $1 OR "refUid2".id = $1);`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

// get accepted friend requests (get friends)
router.get('/accepted', (req, res) => {
  const queryText = `
    SELECT array_agg(
      ARRAY[
        CASE
          WHEN "refUid1".id = $1 THEN CAST("refUid2".id AS VARCHAR)
          WHEN "refUid2".id = $1 THEN CAST("refUid1".id AS VARCHAR)
        END
        ,
        CASE
          WHEN "refUid1".id = $1 THEN "refUid2".fullname
          WHEN "refUid2".id = $1 THEN "refUid1".fullname
        END
        ,
        CASE
          WHEN "refUid1".id = $1 THEN "refUid2".username
          WHEN "refUid2".id = $1 THEN "refUid1".username
        END
      ]) AS "friends" FROM "friend"
      JOIN "user" AS "refUid1" ON "refUid1".id = "friend".uid1
      JOIN "user" AS "refUid2" ON "refUid2".id = "friend".uid2
      WHERE ("refUid1".id = $1 OR "refUid2".id = $1)
      GROUP BY "refUid1".fullname;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

router.post('/send', (req, res) => {
  let uid1 = req.user.id;
  let uid2 = req.body.id;
  if (uid1 > uid2) {
    uid1 = req.body.id;
    uid2 = req.user.id;
  }

  const queryText = `
    INSERT INTO "request" ("uid1", "uid2", "from")
      VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [uid1, uid2, req.user.id])
    .then(result => res.sendStatus(200))
    .catch(error => console.log(error));
});

router.put('/cancel', (req, res) => {
  const queryText = `
    DELETE FROM "request" WHERE "from" = $1
      AND (uid1 = $2 OR uid2 = $2);`;
  pool
    .query(queryText, [req.user.id, req.body.id])
    .then(result => res.sendStatus(200))
    .catch(error => console.log(error));
});

router.post('/accept', (req, res) => {
  let uid1 = req.user.id;
  let uid2 = req.body.id;
  if (uid1 > uid2) {
    uid1 = req.body.id;
    uid2 = req.user.id;
  }

  const postQueryText = `
    INSERT INTO "friend" (uid1, uid2)
      VALUES ($1, $2);`;
  const deleteQueryText = `
    DELETE FROM "request"
      WHERE uid1 = $1 AND uid2 = $2;`;
  pool
    .query(postQueryText, [uid1, uid2])
    .then(result => {
      pool
        .query(deleteQueryText, [uid1, uid2])
        .then(result => res.sendStatus(200))
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});

router.put('/reject', (req, res) => {
  const queryText = `
    DELETE FROM "request" WHERE "request".from = $1
      AND (uid1 = $2 OR uid2 = $2);`;
  pool
    .query(queryText, [req.body.id, req.user.id])
    .then(result => res.sendStatus(200))
    .catch(error => console.log(error));
});

router.put('/delete', (req, res) => {
  let uid1 = req.user.id;
  let uid2 = req.body.id;
  if (uid1 > uid2) {
    uid1 = req.body.id;
    uid2 = req.user.id;
  }
  const queryText = `
    DELETE FROM "friend" WHERE uid1 = $1 AND uid2 = $2;`;
  pool
    .query(queryText, [uid1, uid2])
    .then(result => res.sendStatus(200))
    .catch(error => console.log(error));
});

module.exports = router;