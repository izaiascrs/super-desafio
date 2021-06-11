const Joi = require('joi');

const schema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().required(),
    telefone: Joi.string().required(),
    data_nasc: Joi.date().required(),
    uf_id: Joi.number().required(),
    crm: Joi.string().required(),
});

module.exports = schema;