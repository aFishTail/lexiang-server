const Sequelize = require('sequelize')
const seq = require('../seq')
const { STRING, INTEGER } = require('../types')
const { DEFAULT_PICTURE } = require('../../config/constant')

const User = seq.define('user', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: STRING,
    unique: true,
    allowNull: false,
    comment: '用户名，唯一',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    defaultValue: '昵称',
  },
  picture: {
    type: STRING,
    defaultValue: DEFAULT_PICTURE,
  },
})

module.exports = User
