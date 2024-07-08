const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organization = sequelize.define('Organization',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    }
  },
  {
    // Other model options go here
    
  },
);

module.exports = Organization;
