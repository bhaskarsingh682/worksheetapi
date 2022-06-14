const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userid: { type: DataTypes.STRING, allowNull: false },
        words: { type: DataTypes.JSON, allowNull: false },
   
    };


    return sequelize.define('words', attributes);
}