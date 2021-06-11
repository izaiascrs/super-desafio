const { Model, DataTypes } = require('sequelize');

class Ufs extends Model {
    static init(sequelize) {
        super.init({
            uf_nome: DataTypes.STRING,            
        },{
            sequelize,
        }) 
    }
}

module.exports = Ufs;