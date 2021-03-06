const path = require('path');

module.exports = (sequelize, DataTypes) => {
    const corners = [
        'BDL', 'BDR', 'BLU', 'BRU',
        'DBL', 'DBR', 'DFL', 'DFR',
        'FDL', 'FDR', 'FLU', 'FRU',
        'LBD', 'LBU', 'LDF', 'LFU',
        'RBD', 'RBU', 'RDF', 'RFU',
        'UBL', 'UBR', 'UFL', 'UFR',
    ];

    const db = sequelize.define('numbering_corner', {
        userName: {
            field: 'user_name',
            type: DataTypes.STRING,
            primaryKey: true,
        },
        sticker: {
            field: 'sticker',
            type: DataTypes.ENUM(corners),
            primaryKey: true,
        },
        letter: {
            field: 'letter',
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'numbering_corner',
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    const User = sequelize.import(path.join(__dirname, '/user'));
    db.belongsTo(User, {
        foreignKey: 'userName',
        targetKey: 'userName',
    });

    return db;
};
