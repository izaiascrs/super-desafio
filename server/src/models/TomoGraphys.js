const { Model, DataTypes } = require('sequelize');

class Tomografias extends Model {
    static init(sequelize) {
        super.init({
            codigo_projeto: DataTypes.STRING,
            espessura_tc: DataTypes.INTEGER,
            dicon: DataTypes.STRING,
        }, {
            sequelize,
        }) 
    }

    static associate(models) {
        this.belongsTo(models.Casos, { foreignKey: 'caso_id', as: 'caso'});
        this.belongsTo(models.Pacientes, { foreignKey: 'paciente_id', as: 'paciente'});
    }
}

module.exports = Tomografias;