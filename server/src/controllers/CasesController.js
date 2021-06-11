const Medicos = require('../models/Doctor');
const Pacientes = require('../models/Patients');
const Status = require('../models/Status');
const Cases = require('../models/Cases');

const Schema = require('../models/schema/Cases');

module.exports = {
    async index(req, res, next) {
        const cases =  await Cases.findAll({
            include: ['medico', 'paciente', 'status'],
            attributes: { exclude: ["medico_id","paciente_id","status_id"] },
        });
        res.json(cases);
    },

    async show(req, res, next) {

        const { id } = req.params

        try {
            const cases =  await Cases.findByPk(id, {
                include: ['medico', 'paciente', 'status'],
                attributes: { exclude: ["medico_id","paciente_id","status_id"] },
            });
            if(!cases) {
                const err = new Error('Caso não encontrado');
                res.status(404)
                next(err)
            }
            res.json(cases);            
        } catch (error) {
            next(error)
        }
    },   

    async store (req, res, next) {
        const { medico_id, paciente_id, status_id, data_cirurgia, codigo_caso } = req.body;
        
        try {
            const medico = await Medicos.findByPk(medico_id);
            const paciente = await Pacientes.findByPk(paciente_id);
            const status = await Status.findByPk(status_id);

            if(!medico || !paciente || !status) {
                const error = new Error('Não foi possivel completar a operação')
                res.status(400);
                next(error)
            }

            console.log(medico_id)

            const validCase =  await Schema.validateAsync({ medico_id, paciente_id, status_id, data_cirurgia, codigo_caso })

            const cases = await Cases.create(validCase);
            return res.json(validCase);

        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { medico_id, paciente_id, status_id, data_cirurgia, codigo_caso } = req.body;

        try {
            const validUpdatedCase =  await Schema.validateAsync({ medico_id, paciente_id, status_id, data_cirurgia, codigo_caso });

            const caso = await Cases.findByPk(id);

            if(!caso) {
                const err = new Error('Caso não encontrado');
                res.status(404)
                next(err)
            }
            await Cases.update(validUpdatedCase, { where: { id } });
            
            return res.json(validUpdatedCase)
            
        } catch (error) {
            next(error);
        }

    },

    async delete(req, res, next) {
        const { id } = req.params

        try {
            const singleCase = await Cases.findByPk(id)

            if(!singleCase) {
                const err = new Error('Caso não encontrado');
                res.status(404)
                next(err)
            }
            await singleCase.destroy({ where: {id: id} });
            return res.send().status(200);
        } catch (error) {
            next(error)
        }
    },
}