const { Model, DataTypes } = require('sequelize');

class Pacientes extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            iniciais: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            data_nasc: DataTypes.DATE,
        }, {
            sequelize,
        }) 
    }

    static associate(models) {
        this.belongsTo(models.Medicos, { foreignKey: 'medico_id', as: 'medico'});
    }
}

module.exports = Pacientes;