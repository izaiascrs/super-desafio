const Joi = require('joi');

const schema = Joi.object({
    caso_id: Joi.number().required(),
    paciente_id: Joi.number().required(),
    codigo_projeto: Joi.string().required(),
    espessura_tc: Joi.number().required(),
    dicon: Joi.string().required(),
});

module.exports = schema;