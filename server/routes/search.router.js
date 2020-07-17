const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:search', (req, res) => {
  const search = req.params.search;
  const queryText = `
    SELECT id, fullname, username, avatar_url, bio FROM "user"
      WHERE (username ILIKE $1 OR fullname ILIKE $1)
      AND id <> $2
      ORDER BY fullname DESC LIMIT 15;`;
  pool
    .query(queryText, [`%${search}%`, req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

module.exports = router;