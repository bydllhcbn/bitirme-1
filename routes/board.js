var express = require('express');
var router = express.Router();
let db = require('../db');
let ws = require('../websocket');

router.post('/add', async (req, res) => {

    let boardId = await db.dbInsert("INSERT INTO boards (title) VALUES (?)", [req.body.title]);
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    let board = await db.dbGetFirst("SELECT * FROM boards WHERE id = ?", [req.params.id]);
    let ads = await db.db("SELECT * FROM ads WHERE board_id = ?", [req.params.id])

    res.render('board_edit', {title: 'Pano Düzenle', board: board, ads: ads, boardId: req.params.id});
});

router.post('/edit', async (req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    await db.dbi("UPDATE boards SET title = ? WHERE id = ?", [title, id]);


    ws.reloadUser(id);
    res.redirect('/board/edit/' + id);
});


router.get('/delete/:id', async (req, res) => {
    await db.dbi("DELETE FROM boards WHERE id = ?", [req.params.id]);
    res.redirect('/');
});

module.exports = router;
