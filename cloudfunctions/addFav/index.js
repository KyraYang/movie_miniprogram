const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  return await db.collection('favorite').add({
    data: {
      user,
      commentId:event.id,
      createTime: +new Date(),
    }
  })}