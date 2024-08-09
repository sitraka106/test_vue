const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Task = require('./task')(sequelize, Sequelize);

// Relations entre les modèles
User.hasMany(Task, { foreignKey: 'Pid_person' });
Task.belongsTo(User, { foreignKey: 'Pid_person' });

module.exports = {
    User,
    Task,
    sequelize,
};