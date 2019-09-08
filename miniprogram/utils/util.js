module.exports = {
  //转跳页面的共享函数
  toPage(destination, options) {
    if (options) {
      wx.navigateTo({
        url: '/pages/' + destination + '/' + destination + '?id=' + options.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/' + destination + '/' + destination,
      })
    }
  },

  
toComment(destination,id){
  wx.navigateTo({
    url: '/pages/' + destination + '/' + destination + '?id=' +  id})
},


  //用户信息获取
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === false) {
            reject(null)
          } else {
            wx.getUserInfo({
              success(res) {
                const userInfo = res.userInfo
                resolve(userInfo)
              }
            })
          }
        }
      })
    })
  },

  getRandomId() {
    return Math.floor((1 + Math.random()) * 0x100000000).toString(16).slice(1)
  },

  showCommentChoice(data) {
    const filmDetail = JSON.stringify(data)
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        wx.navigateTo({
          url: '/pages/commentEditor/commentEditor?id=' + res.tapIndex + '&filmDetail=' + filmDetail,
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  
}

