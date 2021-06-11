const { Model, DataTypes } = require('sequelize');

class Casos extends Model {
    static init(sequelize) {
        super.init({
            data_cirurgia: DataTypes.DATE,
            codigo_caso: DataTypes.STRING,
        }, {
            sequelize,
        }) 
    }
    static associate(models) {
        this.belongsTo(models.Medicos, { foreignKey: 'medico_id', as: 'medico'});
        this.belongsTo(models.Pacientes, { foreignKey: 'paciente_id', as: 'paciente'});
        this.belongsTo(models.Status, { foreignKey: 'status_id', as: 'status'});
    }
}

module.exports = Casos;