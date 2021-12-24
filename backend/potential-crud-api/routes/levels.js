const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET Retorna os níveis de acordo com o termo passado via querystring e paginação */
router.get('/', async (req, res) => {
    const Levels = db.Mongoose.model('levels', db.LevelsSchema, 'levels');
    let {
        nivel,
        page,
        limit,
        orderBy,
        direction
    } = req.query;

    let levelQuery = {
        nivel: {
            $regex: nivel || '',
            $options: 'i'
        }
    };

    limit = limit ? +limit : 0;
    const skip = limit && page ? (page - 1) * limit : 0;

    try {
        const docs = await Levels.find(levelQuery, {
            __v: 0
        }).sort({
            [orderBy]: direction == 'asc' ? 1 : -1
        }).skip(skip).limit(limit);

        const qtd = await Levels.find(levelQuery).count();

        const data = {
            docs,
            qtd
        };

        res.json(data);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }

    
});

/* GET Retorna os dados de um nível. */
router.get('/:id', async (req, res) => {
    const Levels = db.Mongoose.model('levels', db.LevelsSchema, 'levels');
    const {
        id
    } = req.params;

    try {
        const level = await Levels.find({
            _id: Object(id)
        });

        res.send(level);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

/* POST Adiciona um novo nível. */
router.post('/', async (req, res) => {
    const Levels = db.Mongoose.model('levels', db.LevelsSchema, 'levels');
    const levels = new Levels(req.body);

    try {
        await levels.save();
        res.statusCode = 201;
        res.send('');
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

/* PUT Atualiza os dados de um nível. */
router.put('/:id', async (req, res) => {
    const Levels = db.Mongoose.model('levels', db.LevelsSchema, 'levels');
    const {
        id
    } = req.params;
    const levels = new Levels(req.body, {
        _id: 0
    });

    try {
        await Levels.updateOne({
            _id: Object(id)
        }, {
            $set: levels
        });

        res.statusCode = 200;
        res.send('');
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
});

/* DELETE Apaga o registro de um nível. */
router.delete('/:id', async (req, res) => {
    const Levels = db.Mongoose.model('levels', db.LevelsSchema, 'levels');
    const {
        id
    } = req.params;

    try {
        await Levels.deleteOne({
            _id: Object(id)
        });

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
});

module.exports = router;