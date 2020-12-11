const router = require('express').Router();
const db = require('../models/index.js');

router.post(`/`, async (req,res,next) => {
    let params = req.body;
    await db.Films.findOrCreate(
        {where: {
            name: params.name,
            year: params.year,
            format: params.format
        }
    });
    return res.status(200).json({
        success : true,
        err: null,
    });
});

router.get(`/all`, async (req,res,next) => {
    let films = await db.Films.findAll();
    return res.status(200).json(films);
});

router.get(`/filter/:filter/:value`,async (req,res,next) => {
    let filter = req.params.filter;
    let value = req.params.value;
    let where = {};
    where[filter] = value;
    let film = await db.Films.findAll({
        where: where
      });
    return res.status(200).json(film);  
})

router.delete(`/id/:id`, async (req,res,next) => {
    let id = params.id;
    await db.Films.destroy({
        where: {
          id: id
        }
    });
    return res.status(200).send(`OK`);
});

module.exports = router;