var express = require('express');
var router = express.Router();
let db = require('../db');
let ws = require('../bin/connection');


router.get('/', async (req, res) => {
    let boards = await db.db("SELECT *,(SELECT COUNT(*) FROM ads WHERE board_id = boards.id) as c FROM boards");
    let clients = ws.getClients();
    for (let board of boards) {
        board.online = board.id in clients;
    }
    res.render('index', {title: 'ILAN', boards: boards});
});

router.get('/addBoard', async (req, res) => {
    res.render('board_add', {title: 'PANO EKLE'});
});

module.exports = router;
