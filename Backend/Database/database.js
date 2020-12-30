const mongoose = require('mongoose');
const Game=require('./games');

const connectToMongo = () => {
    mongoose.connect('mongodb://localhost:27017/games', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = {
    connectToMongo,
    Game
}