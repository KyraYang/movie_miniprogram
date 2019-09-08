// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  try {
    return await db.collection('favorite').where({
      commentId:event.id,
      user
    }).remove()
  } catch (e) {
    console.error(e)
  }
  
}
