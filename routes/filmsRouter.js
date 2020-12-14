const router = require('express').Router();
const db = require('../models/index.js');

//Добавить фильм
router.post(`/`, async (req,res,next) => {
    let params = req.body;
    await db.Films.findOrCreate(
        {where: {
            name: params.name.trim().toLowerCase(),
            year: params.year,
            format: params.format
        }
    });
    return res.status(200).json({
        success : true,
        err: null,
    });
});

// Удалить фильм
router.delete(`/id/:id`, async (req,res,next) => {
    let id = req.params.id;
    await db.Films.destroy({
        where: {
          id: id
        }
    });
    return res.status(200).send(`OK`);
});

// Получить фильм по фильтру
router.get(`/filter/:filter/:value`,async (req,res,next) => {
    let filter = req.params.filter;
    let value = req.params.value;
    let where = {};
    where[filter] = value;
    console.log(where);
    let film = await db.Films.findAll({
        where: where
      });
    return res.status(200).json(film);  
});

// Получить список всех фильмов + сортировка
router.get(`/all`, async (req,res,next) => {
    console.log(req.query.sort)
    let order = typeof req.query.sort === undefined ? "createdAt" : "name";
    let orderBy = [order ,'DESC'];
    let films = await db.Films.findAll({order: [orderBy]});
    films = films.map (item => {
        return item.dataValues;
    })
    return res.status(200).json(films);
});



module.exports = router;