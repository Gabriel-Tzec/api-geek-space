require('dotenv').config();

const Sequelize = require('sequelize');

const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dialect = process.env.DB_DIALECT

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  dialectOptions: {
    ssl: {
      require: true,
     
    }
  }
});

module.exports = sequelize;