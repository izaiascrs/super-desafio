const { Model, DataTypes } = require('sequelize');

class Medicos extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            data_nasc: DataTypes.DATE,
            crm: DataTypes.STRING,
        }, {
            sequelize,
        }) 
    }

    static associate(models) {
        this.belongsTo(models.Ufs, { foreignKey: 'uf_id', as: 'uf'});
        this.hasMany(models.Pacientes, { foreignKey: 'medico_id', as: 'pacientes'})
    }
}

module.exports = Medicos;