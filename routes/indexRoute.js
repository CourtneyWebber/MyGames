let express = require('express');
let router = express.Router();
let gamesController = require('../controllers/gamesController.js');

router.get('/', (req, res) => {
    gamesController.getGames(req, res);
});

router.post('/addGame', (req, res) => {
    gamesController.postGame(req, res);
})

router.get('/id', (req, res) => {
    gamesController.getGame(req, res);
})

router.put('/updateGame', (req, res) => {
    gamesController.putGame(req, res);
})

module.exports = router;