const Ufs = require('../models/Ufs')

module.exports = {
    async index(req, res, next) {
        const ufs =  await Ufs.findAll();
        res.json(ufs);
    },

    async store (req, res, next) {
        const { uf_nome } = req.body;
        try {
            const uf = await Ufs.create({uf_nome});
            return res.json(uf)
        } catch (error) {
            next(error)
        }
    }
}