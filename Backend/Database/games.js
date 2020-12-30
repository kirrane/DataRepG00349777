let mongoose = require('mongoose');


let gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }
})

let Game = mongoose.model('Game', gameSchema);
module.exports = Game;