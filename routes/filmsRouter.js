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

module.exports = router;