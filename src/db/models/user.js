const Sequelize = require('sequelize')
const seq = require('../seq')
const { STRING, INTEGER } = require('../types')

const User = seq.define('user', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickname: {
    type: STRING,
    allowNull: false,
    defaultValue: '昵称'
  },
  picture: {
    type: STRING,
    defaultValue: '/images/lishifu.jpg'
  }
})

module.exports = User
