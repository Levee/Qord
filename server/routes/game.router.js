const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id/:count', (req, res) => {
  const id = req.params.id;
  const count = req.params.count;
  axios
    .get(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${id}&count=${count}`)
    .then(result => res.send(result.data))
    .catch(error => res.send(error).status(500));
});

router.get('/', (req, res) => {
  axios
    .get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
    .then(result => res.send(result.data))
    .catch(error => res.send(error).status(500));
});

router.get('/library', (req, res) => {
  const queryText = `
    SELECT * FROM library WHERE user_id = $1 GROUP BY user_id;`;
  pool
    .query(queryText, [req.user.id])
    .then(result => res.send(result.rows).status(200))
    .catch(error => res.send(error).status(500));
});

router.get('/info', (req, res) => {
  axios
    .get(`https://store.steampowered.com/api/appdetails?appids=${req.body.appid}`)
    .then(result => res.send(result.data))
    .catch(error => res.send(error).status(500));
});

router.post('/new', (req, res) => {
  
});

module.exports = router;