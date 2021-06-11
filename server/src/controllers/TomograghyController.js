const Cases = require('../models/Cases');
const Patients = require('../models/Patients');
const Tomographys = require('../models/TomoGraphys');

const Schema = require('../models/schema/Tomography')

module.exports = {
    async index(req, res, next) {
        const tomograghy =  await Tomographys.findAll({ 
            include: ['caso', 'paciente'],
            attributes: { exclude: ['paciente_id', 'caso_id']},
        });
        res.json(tomograghy);
    },
    
    async show(req, res, next) {

        const { id } = req.params

        try {
            const tomograghy =  await Tomographys.findByPk(id);
            if(!tomograghy) {
                const err = new Error('Tomografia não encontrado');
                res.status(404)
                next(err)
            }
            res.json(tomograghy);            
        } catch (error) {
            next(error)
        }
    },   

    async store (req, res, next) {
        const { caso_id, paciente_id, codigo_projeto, espessura_tc, dicon } = req.body;

        try {
            const caso = await Cases.findByPk(caso_id);
            const paciente = await Patients.findByPk(paciente_id);

            if(!caso || !paciente) {
                const error = new Error('Não foi possivel completar a operação!')
                res.status(400);
                next(error)
            }

            const validTomography = await Schema.validateAsync({caso_id, paciente_id, codigo_projeto, espessura_tc, dicon })

            const tomography = await Tomographys.create(validTomography);
            return res.json(tomography)
        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { caso_id, paciente_id, codigo_projeto, espessura_tc, dicon } = req.body;

        try {
            const validUpdatedTomography =  await Schema.validateAsync({ caso_id, paciente_id, codigo_projeto, espessura_tc, dicon });

            const tomograghy = await Tomographys.findByPk(id);

            if(!tomograghy) {
                const err = new Error('Tomografia não encontrado');
                res.status(404)
                next(err)
            }
            await Tomographys.update(validUpdatedTomography, { where: { id } });
            
            return res.json(validUpdatedTomography)
            
        } catch (error) {
            next(error);
        }

    },

    async delete(req, res, next) {
        const { id } = req.params

        try {
            const singleTomography = await Tomographys.findByPk(id)

            if(!singleTomography) {
                const err = new Error('Tomografia não encontrado');
                res.status(404)
                next(err)
            }
            await singleTomography.destroy({ where: {id: id} });
            return res.send().status(200);
        } catch (error) {
            next(error)
        }
    },
}