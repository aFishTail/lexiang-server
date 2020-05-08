/**
 * @description 数据格式化
 * @author wh
 */

const { DEFAULT_PICTURE } = require('../config/constant')

/**
 * 格式化用户头像
 * @param {Object} obj 用户对象
 */
function formatUserPicture(obj) {
    if(obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

module.exports = {
    formatUserPicture
}