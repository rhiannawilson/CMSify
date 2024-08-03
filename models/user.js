const { Model, DataTypes } = require('sequelize'); // destructing Models and Datatypes, classes that are defined inside sequelize
const bcrypt = require('bcrypt'); //importing bcrypt library, allows you to hash a string/data structure 
const sequelize = require('../config/connection'); // connects to your database, which is defined in connection.js

// MySQL & Postgres are database engines/servers handles relational database (seperate from JS) 

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); //loginPW what the user types in & this represents the object 'calling this'
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize, // this is the portion that lets you know where to make this user table and connect to database
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
