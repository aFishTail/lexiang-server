const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const seq = new Sequelize(MYSQL_CONF)

module.exports = seq
