const Status = require('../models/Status')

module.exports = {
    async index(req, res, next) {
        const status =  await Status.findAll();
        res.json(status);
    },

    async store (req, res, next) {
        const { status } = req.body;
        try {
            const status_name = await Status.create({ status });
            return res.json(status_name)
        } catch (error) {
            next(error)
        }
    }
}