const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM library WHERE user_id = $1 GROUP BY user_id;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

router.get('/game/:id', (req, res) => {
  const appid = req.params.id
  axios
    .get(`http://store.steampowered.com/api/appdetails?appids=${appid}`)
    .then(result => res.send(result.data[appid]))
    .catch(error => res.send(error).status(500));
});

router.post('/save', (req, res) => {
  const queryText = `
    INSERT INTO "library" (user_id, app_id, title, developers, publishers, description)
    VALUES ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [
      req.body.user_id,
      req.body.app_id,
      req.body.title,
      req.body.developers,
      req.body.publishers,
      req.body.description
    ])
    .then(result => res.sendStatus(200))
    .catch(error => res.send(error).status(500));
});

module.exports = router;