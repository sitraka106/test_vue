module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('à faire', 'en cours', 'terminé'),
            allowNull: false,
        },
        Pid_person: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Task;
};