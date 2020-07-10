const express = require('express');
const axios = require('axios');
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

module.exports = router;