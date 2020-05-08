const seq = require('./seq')

require('./models/index')

const User= require('./models/user')

seq.sync({ force: true }).then(() => {
  console.log('数据同步成功')
  User.create({
    userName: 'wh2',
    password: '123'
  }).then(() => {
    console.log('新增成功')
  }).catch(() => {
    console.log('新增失败')
  })
}).catch(() => {
  console.log('数据同步成功失败')
})