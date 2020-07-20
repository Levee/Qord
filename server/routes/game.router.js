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

router.get('/apps', (req, res) => {
  axios
    .get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
    .then(result => res.send(result.data))
    .catch(error => res.send(error).status(500));
});

module.exports = router;