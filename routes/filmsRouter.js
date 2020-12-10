const router = require('express').Router;
const db = require('./models/index.js');

router.post(`/`, async (req,res,next) => {
    let params = req.body;
    let dbResponse = await db.Films.findOrCreate(
        {where: {
            name: params.name,
            year: params.year,
            format:
        }
    });
    console.log(dbResponse);

    
});

router.get(`/`, async () => {

})
