var db = require('./Database/database');

exports.getGames = (req, res) => {
    db.Game.find()
        .then((games) => {
            res.json(games);
        })
        .catch((error) => res.send(error))
};

exports.createGame = (req, res) => {
    db.Game.create({
        name: req.body.name,
        developer: req.body.developer,
        release: req.body.release,
        desc: req.body.desc,
        requirements: req.body.requirements,
        cover: req.file.path
    })
        .then((newGame) => res.status(201).json(newGame))
        .catch((error) => res.send(error));
}

exports.getGame = (req, res) => db.Game.findById(req.params.gameId)
    .then((game) => { console.log(req.params); res.json(game) })
    .catch((error) => res.send(error));

exports.updateGame = (req, res) => db.Game.findOneAndUpdate({ _id: req.params.gameId }, req.body, { new: true })
    .then((Game) => { console.log(req.body); res.json(Game) })
    .catch((error) => res.send(error));

exports.removeGame = (req, res) => db.Game.deleteOne({ _id: req.params.gameId })
    .then(() => {
        res.json("deleted");
    })
    .catch((error) => res.send(error));



module.exports = exports;