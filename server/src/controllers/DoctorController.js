const Doctors = require('../models/Doctor');
const Ufs = require('../models/Ufs');

const Schema = require('../models/schema/Doctor');

module.exports = {
    async index(req, res, next) {
        const doctors =  await Doctors.findAll({ include: ['pacientes', 'uf']});
        res.json(doctors);
    },

    async show(req, res, next) {
        const { id } = req.params

        try {
            const doctor =  await Doctors.findByPk(id, { include: ['pacientes', 'uf']});
            if(!doctor) {
                const err = new Error('Médico não encontrado');
                res.status(404)
                next(err)
            }
            res.json(doctor);            
        } catch (error) {
            next(error)
        }

    },

    async store (req, res, next) {
        const { nome, email, telefone, data_nasc, uf_id, crm } = req.body;
       
        try {
            const uf = await Ufs.findByPk(uf_id);
            if(!uf) {
                const error = new Error('UF Inválido')
                res.status(400);
                next(error)
            }

            const validDoctor = await Schema.validateAsync({
                nome,
                email,
                telefone,
                data_nasc,
                uf_id,
                crm 
            });

            const doctor = await Doctors.create(validDoctor);
            return res.json(doctor);

        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { nome, email, telefone, data_nasc, uf_id, crm } = req.body;

        try {
            const ValidDoctor =  await Schema.validateAsync({ nome, email, telefone, data_nasc, uf_id, crm });

            const doctor = await Doctors.findByPk(id);

            if(!doctor) {
                const err = new Error('Médico não encontrado');
                res.status(404)
                next(err)
            }
            await Doctors.update(ValidDoctor, { where: { id } });
            
            return res.json(ValidDoctor)
            
        } catch (error) {
            next(error);
        }

    },

    async delete(req, res, next) {
        const { id } = req.params

        try {
            const singleDoctor = await Doctors.findByPk(id)

            if(!singleDoctor) {
                const err = new Error('Caso não encontrado');
                res.status(404)
                next(err)
            }

            await Doctors.destroy({ where: { id } });
            return res.send().status(200);

        } catch (error) {
            next(error)
        }
    },
}