const Patients = require('../models/Patients');
const Doctors = require('../models/Doctor');

const Schema = require('../models/schema/Patient')

module.exports = {
    async index(req, res, next) {
        const patients =  await Patients.findAll({ include: 'medico' } );
        res.json(patients);
    },

    async show(req, res, next) {

        const { id } = req.params

        try {
            const patient =  await Patients.findByPk(id);
            if(!patient) {
                const err = new Error('Paciente não encontrado');
                res.status(404)
                next(err)
            }
            res.json(patient);            
        } catch (error) {
            next(error)
        }
    }, 

    async store (req, res, next) {
        const { nome, medico_id, iniciais, email, telefone, data_nasc } = req.body;

        try {
            const doctor = await Doctors.findByPk(medico_id);
            if(!doctor) {
                const error = new Error('médico não existe!')
                res.status(400);
                next(error)
            }

            const validPatient = await Schema.validateAsync({nome, medico_id, iniciais, email, telefone, data_nasc })
            const patient = await Patients.create(validPatient);
            return res.json(patient);

        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { nome, medico_id, iniciais, email, telefone, data_nasc } = req.body;

        try {
            const ValidPatient =  await Schema.validateAsync({ nome, medico_id, iniciais, email, telefone, data_nasc });

            const patient = await Patients.findByPk(id);

            if(!patient) {
                const err = new Error('Paciente não encontrado');
                res.status(404)
                next(err)
            }
            await Patients.update(ValidPatient, { where: { id } });
            
            return res.json(ValidPatient);
            
        } catch (error) {
            next(error);
        }

    },

    async delete(req, res, next) {
        const { id } = req.params

        try {
            const patient = await Patients.findByPk(id)

            if(!patient) {
                const err = new Error('Paciente não encontrado');
                res.status(404)
                next(err)
            }

            await Patients.destroy({ where: { id } });
            return res.send().status(200);

        } catch (error) {
            next(error)
        }
    },
}