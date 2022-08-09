const axios = require("axios");

let getGame = function (req, res) {
    let id = req.query.id;
    axios.get('http://localhost:3500/games/' + id).then(function (response) {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    });
}

let getGames = function (req, res) {
    axios.get('http://localhost:3500/games').then(function (response) {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    });
}

let postGame = function (req, res) {
    let newGame = req.body;
    axios.post('http://localhost:3500/games', newGame).then(function (response) {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    });
}

let putGame = function (req, res) {
    let updatedGame = req.body;
    let id = req.query.id;
    axios.put('http://localhost:3500/games/'+id, updatedGame).then(function (response) {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports = { getGames, postGame, getGame, putGame };
