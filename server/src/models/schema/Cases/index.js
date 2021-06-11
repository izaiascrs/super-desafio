const Joi = require('joi');

const schema = Joi.object({
    medico_id: Joi.number().required(),
    paciente_id: Joi.number().required(),
    data_cirurgia: Joi.date().required(),
    codigo_caso: Joi.string().required(),
    status_id: Joi.number().required(),
});

module.exports = schema;