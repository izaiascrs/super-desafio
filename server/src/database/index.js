const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Ufs = require('../models/Ufs');
const Doctors = require('../models/Doctor');
const Patients = require('../models/Patients');
const Status = require('../models/Status');
const Cases = require('../models/Cases');
const Tomographys = require('../models/TomoGraphys');

Doctors.init(connection);
Ufs.init(connection);
Patients.init(connection);
Status.init(connection);
Cases.init(connection);
Tomographys.init(connection);

Doctors.associate(connection.models);
Patients.associate(connection.models);
Cases.associate(connection.models);
Tomographys.associate(connection.models);

module.exports = connection;