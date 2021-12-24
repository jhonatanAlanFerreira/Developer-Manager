const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET Retorna os desenvolvedores de acordo com o termo passado via querystring e paginação */
router.get('/', async (req, res) => {
    const Developers = db.Mongoose.model('developers', db.DevelopersSchema, 'developers');
    let {
        nome,
        hobby,
        sexo,
        idade,
        datanascimento,
        nivel,
        page,
        limit,
        orderBy,
        direction
    } = req.query;

    let devQuery = {
        nome: {
            $regex: nome || '',
            $options: 'i'
        },
        hobby: {
            $regex: hobby || '',
            $options: 'i'
        }
    };

    let nivelSearch = {};

    if (sexo) devQuery.sexo = sexo;
    if (idade) devQuery.idade = +idade;
    if (datanascimento) devQuery.datanascimento = datanascimento;
    if (nivel) nivelSearch = { nivel };

    if (orderBy == 'nivel') orderBy = 'nivel.nivel';

    limit = limit ? +limit : 0;
    const skip = limit && page ? (page - 1) * limit : 0;

    const aggregate = [
        { $addFields: { nivelObjId: { $toObjectId: "$nivel" } } },
        { $project: { __v: 0 } },
        {
            $lookup:
            {
                from: "levels",
                localField: "nivelObjId",
                foreignField: "_id",
                as: "nivel",
                pipeline: [
                    { $project: { "__v": 0 } },
                    { $match: nivelSearch}
                ]
            },
        }, { $unwind: '$nivel' },
        { $match: devQuery },
        { $sort: { [orderBy]: direction == 'asc' ? 1 : -1 } },
        { $skip: skip }
    ];

    if (limit) aggregate.push({ $limit: limit });

    try {
        const docs = await Developers.aggregate(aggregate);

        const qtd = await Developers.find(devQuery).count();

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

/* GET Retorna os dados de um desenvolvedor. */
router.get('/:id', async (req, res) => {
    const Developers = db.Mongoose.model('developers', db.DevelopersSchema, 'developers');
    const {
        id
    } = req.params;

    try {
        const developer = await Developers.find({
            _id: Object(id)
        });

        res.send(developer);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

/* POST Adiciona um novo desenvolvedor. */
router.post('/', async (req, res) => {
    const Developers = db.Mongoose.model('developers', db.DevelopersSchema, 'developers');
    const developer = new Developers(req.body);

    try {
        await developer.save();
        res.statusCode = 201;
        res.send('');
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

/* PUT Atualiza os dados de um desenvolvedor. */
router.put('/:id', async (req, res) => {
    const Developers = db.Mongoose.model('developers', db.DevelopersSchema, 'developers');
    const {
        id
    } = req.params;
    const developer = new Developers(req.body, {
        _id: 0
    });

    try {
        await Developers.updateOne({
            _id: Object(id)
        }, {
            $set: developer
        });

        res.statusCode = 200;
        res.send('');
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
});

/* DELETE Apaga o registro de um desenvolvedor. */
router.delete('/:id', async (req, res) => {
    const Developers = db.Mongoose.model('developers', db.DevelopersSchema, 'developers');
    const {
        id
    } = req.params;

    try {
        await Developers.deleteOne({
            _id: Object(id)
        });

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
});

module.exports = router;