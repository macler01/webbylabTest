var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let films = [];
  return res.status(200).json({
    success: true,
    errMsg: null,
    data: films
  });
});

router.post(`/`, async (req,res,next) => {
  let addFilm = {};
  return res.status(200).json({
    success: true,
    errMsg: null,
    data: addFilm
  });
})

router.delete(`/`, async (req,res,next) => {
  let removeFilm = {}
  return res.status(200).json({
    success:true,
    errMsg: null,
    data:removeFilm
  })
});


module.exports = router;
