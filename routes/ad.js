let express = require('express');
let router = express.Router();
let db = require('../db');
let ws = require('../bin/connection');
router.get('/getAds/:boardId', async (req, res) => {
    let ads = await db.db(`SELECT *
                           FROM ads
                                    INNER JOIN ad_images ON ad_images.ad_id = ads.id
                           WHERE board_id = ?`, [req.params.boardId]);

    let i;
    for (i = 0; i < ads.length; i++) {
        ads[i].info = await db.db("SELECT * FROM ad_info WHERE ad_id = ?", [ads[i].ad_id]);
    }

    res.send(ads);
});

router.get('/', async (req, res) => {
    res.render('client', {title: 'CLIENT'});
});

router.get('/add/:boardId', async (req, res) => {
    res.render('ad_add', {title: 'Reklam Ekle', boardId: req.params.boardId});
});

router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    let board = await db.dbGetFirst("SELECT board_id FROM ads WHERE id = ?", [id]);

    await db.dbi("DELETE FROM ads WHERE id = ?", [id]);
    await db.dbi("DELETE FROM ad_images WHERE ad_id = ?", [id]);
    await db.dbi("DELETE FROM ad_info WHERE ad_id = ?", [id]);
    ws.reloadUser(board.board_id);
    res.redirect('/board/edit/' + board.board_id);
});

router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    let ad = await db.dbGetFirst("SELECT * FROM ads WHERE id = ?", [id]);
    let images = await db.db("SELECT url FROM ad_images WHERE ad_id = ?", [id]);
    let infos = await db.db("SELECT name,content FROM ad_info WHERE ad_id = ?", [id]);
    res.render('ad_edit', {title: 'Reklam Düzenle', id: id, ad: ad, images: images, infos: infos});
});

router.post('/edit', async (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    let price = req.body.price;
    let location = req.body.location;
    let urls = Array.isArray(req.body['urls[]']) ? req.body['urls[]'] : [req.body['urls[]']];
    let info_names = Array.isArray(req.body['info_name[]']) ? req.body['info_name[]'] : [req.body['info_name[]']];
    let info_contents = Array.isArray(req.body['info_content[]']) ? req.body['info_content[]'] : [req.body['info_content[]']];

    await db.dbi("UPDATE ads SET title=?,subtitle=?,price=?,location=? WHERE id = ?",
        [title, subtitle, price, location, id]);

    await db.dbi("DELETE FROM ad_info WHERE ad_id = ?", [id]);
    for (let i of Object.keys(info_names)) {
        if (info_names[i].trim() !== "" && info_contents[i].trim() !== "") {
            await db.dbInsert("INSERT INTO ad_info (ad_id,name,content) VALUES (?,?,?)",
                [id, info_names[i], info_contents[i]]);
        }
    }


    await db.dbi("DELETE FROM ad_images WHERE ad_id = ?", [id]);
    for (let url of urls) {
        if (url.trim() !== "") {
            await db.dbInsert("INSERT INTO ad_images (ad_id,url) VALUES (?,?)", [id, url]);
        }
    }
    let board = await db.dbGetFirst("SELECT board_id FROM ads WHERE id = ?", [id]);

    ws.reloadUser(board.board_id);
    res.redirect('/ad/edit/' + id);
});

router.post('/add', async (req, res) => {

    let title = req.body.title;
    let subtitle = req.body.subtitle;
    let boardId = req.body.boardId;
    let price = req.body.price;
    let location = req.body.location;
    let urls = Array.isArray(req.body['urls[]']) ? req.body['urls[]'] : [req.body['urls[]']];
    let info_names = Array.isArray(req.body['info_name[]']) ? req.body['info_name[]'] : [req.body['info_name[]']];
    let info_contents = Array.isArray(req.body['info_content[]']) ? req.body['info_content[]'] : [req.body['info_content[]']];

    let adId = await db.dbInsert("INSERT INTO ads (board_id,title,subtitle,price,location) VALUES (?,?,?,?,?)",
        [boardId, title, subtitle, price, location]);

    for (let i of Object.keys(info_names)) {
        if (info_names[i].trim() !== "" && info_contents[i].trim() !== "") {
            await db.dbInsert("INSERT INTO ad_info (ad_id,name,content) VALUES (?,?,?)",
                [adId, info_names[i], info_contents[i]]);
        }
    }

    for (let url of urls) {
        if (url.trim() !== "") {
            await db.dbInsert("INSERT INTO ad_images (ad_id,url) VALUES (?,?)", [adId, url]);
        }
    }

    ws.reloadUser(boardId);
    res.redirect('/board/edit/' + boardId);
});

module.exports = router;
