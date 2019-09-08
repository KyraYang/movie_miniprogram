// pages/comments/comments.js
const util = require('../../utils/util.js')
const db = require('../../utils/db')

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
db.getAllComments(options.id).then(res =>{
  this.setData({
    comments: res.data
  })
})
  },
  onTapDetailPage(options){
    const index = options.currentTarget.dataset.id
    const commentId = this.data.comments[index]._id
    wx.navigateTo({
      url: '/pages/commentDetail/commentDetail?id='+commentId,
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})