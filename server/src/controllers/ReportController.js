const Cases = require('../models/Cases')
module.exports = {
    async show(req, res, next) {
        const { case_id: id } = req.body

        try {
            const cases =  await Cases.findByPk( id, {
                include: ['medico', 'paciente', 'status'],
                attributes: { exclude: ["medico_id","paciente_id","status_id"] },
            });

            if(!cases) {
                const err = new Error('Caso não encontrado');
                res.status(404);
                next(err)
            }

            return res.json(cases);

        } catch (error) {
            next(error)
        }
    },
}