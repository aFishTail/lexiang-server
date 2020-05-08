/**
 * @description json schema 验证中间件
 * @author wh
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfos')

/**
 * 生成 json schema 验证的中间件
 * @param {function} valitateFn 验证函数
 */
function genValidator(valitateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = valitateFn(data)
    if(error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功，继续
    await next()
  }
  return validator
}
module.exports = {
  genValidator
}