const express = require('express');
const router = express.Router();
const helpers = require('./helpers');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
    }
})

const upload = multer({ storage: storage })
// use it before all route definitions

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

router.route('/')
    .get(helpers.getGames)
    .post(upload.single('cover'), helpers.createGame,(req,res)=>{console.log(req.cover)})


router.route('/:gameId')
    .get(helpers.getGame)
    .put(helpers.updateGame)
    .delete(helpers.removeGame)

module.exports = router;