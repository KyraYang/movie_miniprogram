const util = require('./util')
const db = wx.cloud.database({
  env: 'udacity-eshop-95ffa'
})

module.exports = {
  getMovieList() {
    return db.collection('film_detail').get()
  },

  addComment(data) {
    return wx.cloud.callFunction({
      name: 'addComment',
      data,
    }).then(result => {
      wx.hideLoading()
      const data = result.result._id
      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
        wx.navigateTo({
          url: '/pages/commentDetail/commentDetail?id=' + data,
        })
      }
    })
  },
  addFav(data){
    return wx.cloud.callFunction({
      name: 'addFav',
      data,
    }).then(result => {
      const data = result.result._id
      if (data) {
        wx.showToast({
          title: '已收藏'
        })
      }
    })
  },

  getCollection(collection,id) {
    return db.collection(collection).where({
      _id: id,
    }).get()
  },

  getAllComments(id){
    return db.collection('comment').where({
      filmId: id,
    }).get()
  },

  getCommentByUser(collection){
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login',
      }).then(res => {
        const user = res.result.openid
        db.collection(collection).where({
          user,
        }).get().then(res => {
          resolve(res)
        })
      })
    })
  },

  checkCollection(filmId) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login',
      }).then(res => {
        const user = res.result.openid
        db.collection('comment').where({
          user,
          filmId:filmId
        }).get().then(res => {
          console.log(res)
          resolve(res)
        })
      })
    })
  },
  checkFavorite(commentId) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login',
      }).then(res => {
        const user = res.result.openid
        db.collection('favorite').where({
          user,
          commentId
        }).get().then(res => {
          console.log(res)
          resolve(res)
        })
      })
    })
  },

  removeComment(data){
    wx.cloud.callFunction({
      name:'removeComment',
      data
    }).then(res=>{
      console.log(res)
    })
  },
  removeFav(data){
    wx.cloud.callFunction({
      name: 'removeFav',
      data
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '已取消收藏'
      })
    })
  },
  isOwnComment(commentUser){
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login',
      }).then(res => {
        const user = res.result.openid
        if (user==commentUser){
          resolve(true)
        }else{
          resolve(false)
        }
      })
    })
  },
}