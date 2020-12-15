const Joi = require('joi');

const schemas = { 
  create: Joi.object().keys({ 
    title: Joi.string().required(), 
    year: Joi.number().integer().min(1850).max(2020).required(), 
    format: Joi.number().valid('DVD','VHS', 'Blu-Ray').required(),
    actors: Joi.string().required(),
})};
 
module.exports = schemas;