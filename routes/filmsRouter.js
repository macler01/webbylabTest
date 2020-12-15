const router = require('express').Router();
const db = require('../models/index.js');
const schemas = require('../schemas');
const multer  = require('multer')
const upload = multer({ dest: './temp' })
const fs = require('fs-extra');
const reader = require('../reader');
const { Op } = require("sequelize");

//Добавить фильм
router.post(`/`,async (req,res,next) => {
    const { error, value } = schemas.create.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }
    let params = value;
    await db.Hollywood.findOrCreate(
        {where: {
            title: params.title,
            year: params.year,
            format: params.format,
            actors: params.actors
        }
    });
    return res.status(200).json({
        success : true,
        err: null,
    });
});

router.post(`/upload`, upload.single('file'),async (req,res,next) => {
    let file = req.file;
    let text = await reader(file.path).catch(err => {
        return res.status(500).json(err);
    });
    let filmArr = [];
    let invalid = [];
    let obj = {};
    text.split('\n').forEach(item => {
        let separator = item.indexOf(':') + 1;
        if (item === '') {
            const { error, value } = schemas.create.validate(obj);
            if (error) {
                obj.err = error;
                invalid.push(obj);
            } else {
                filmArr.push(value);
                obj = {};
            }
        } else if (item.includes("Title")) {
            obj.title = item.slice(separator).trim();
        } else if (item.includes("Release Year")) { 
            obj.year = parseInt(item.slice(separator));
        } else if (item.includes("Format")) {
            obj.format = item.slice(separator).trim();
        } else if (item.includes("Stars")) {
            obj.actors = item.slice(separator).trim();
        }
    });

    let promises = filmArr.map(async film => {
        return db.Hollywood.findOrCreate(
            {where: {
                title: film.title,
                year: film.year,
                format: film.format,
                actors: film.actors
            }
        });
    });

    await Promise.all(promises);

    return res.status(200).json({
        success: true,
        err: null,
        invalid
    })
});

// Удалить фильм
router.delete(`/id/:id`, async (req,res,next) => {
    let id = req.params.id;
    await db.Hollywood.destroy({
        where: {
          id: id
        }
    });
    return res.status(200).send(`OK`);
});

// Получить фильм по фильтру
router.get(`/filter`,async (req,res,next) => {
    let filter = req.body;
    let where = {};
    if (typeof filter.actors === 'undefined') {
        where = filter;
    } else {
        filter.actors = `%${filter.actors}%`
        where = {
            actors: {
                [Op.like]: filter.actors
            }
        }
    }
    let film = await db.Hollywood.findAll({
        where: where
      });
    return res.status(200).json(film);  
});

// Получить список всех фильмов + сортировка
router.get(`/all`, async (req,res,next) => {
    let order = typeof req.query.sort === undefined ? "createdAt" : "title";
    let orderBy = [order ,'ASC'];
    let films = await db.Hollywood.findAll({order: [orderBy]});
    films = films.map (item => {
        return item.dataValues;
    })
    return res.status(200).json(films);
});

module.exports = router;