// pages/detailPage/detailPage.js
const util = require('../../utils/util.js')
const db = require('../../utils/db')
Page({
  data: {
    userComment: null
  },

  /**
   * Page initial data
   */

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '电影详情'
    })
    var id = options.id
    const fileData = wx.getStorageSync('filmData')
    var singleFilm = fileData[id]
    var summary = singleFilm.summary.split('  　　').join('\n') //识别string里的回车，换成\n
    this.setData({
      filmDetail: singleFilm,
      summary: summary
    })
  
  },

  showCommentChoice() {
    db.checkCollection(this.data.filmDetail._id).then(res=>{
      if (!res.data[0]) {
        util.showCommentChoice(this.data.filmDetail)
      } else {
        wx.navigateTo({
          url: '/pages/commentDetail/commentDetail?id=' + res.data[0]._id,
        })
      }
    })
    
  },

  onTapComments() {
    wx.navigateTo({
      url: '/pages/comments/comments?id=' + this.data.filmDetail._id,
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})