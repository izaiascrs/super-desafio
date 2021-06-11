const Joi = require('joi');

const schema = Joi.object({
    medico_id: Joi.number().required(),
    nome: Joi.string().required(),
    iniciais: Joi.string().required(),
    email: Joi.string().required(),
    telefone: Joi.string().required(),
    data_nasc: Joi.date().required(),
});

module.exports = schema;