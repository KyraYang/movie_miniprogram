const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()


exports.main = async(event, context) => {
  try {
    return await db.collection('comment').where({
      _id:event.id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}