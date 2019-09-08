// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  return await db.collection('comment').add({
    data: {
      user,
      username: event.username,
      avatar: event.avatar,
      comment: event.comment,
      type: event.type,
      filmId: event.filmId,
      duration:event.duration,
      createTime: +new Date(),
    }
  })

}