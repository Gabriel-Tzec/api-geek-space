const config = require('config');
const Sequelize = require('sequelize');

const host = config.get('database.host');
const database = config.get('database.database');
const username = config.get('database.username');
const password = config.get('database.password');
const dialect = config.get('database.dialect');

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