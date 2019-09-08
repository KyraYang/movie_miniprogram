// pages/commentDetail/commentDetail.js
const util = require('../../utils/util.js')
const db = require('../../utils/db.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    util.getUserInfo().then(userInfo => {
      this.userInfo = userInfo
      this.setData({
        login: true
      })
    })
    db.getCollection('comment',options.id).then(res => {
      const comment = res.data[0]
      db.getCollection('film_detail',comment.filmId).then(res => {
        this.setData({
          filmDetail: res.data[0],
          comment: comment
        })
      })
      db.isOwnComment(comment.user).then(res => {
        if (res) {
          this.setData({
            edit: true
          })
        } else {
          this.setData({
            edit: false
          })
        }
      })
    })
    
  },

  showCommentChoice() {
    util.showCommentChoice(this.data.filmDetail)
  },

  playRecord() {
    innerAudioContext.src = this.data.comment.comment
    innerAudioContext.play()
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      this.setData({
        onPlay: true
      })
    })
    innerAudioContext.onEnded((res) => {
      console.log('结束')
      this.setData({
        onPlay: false
      })
    })

  },
  stopPlaying() {
    innerAudioContext.stop()
    innerAudioContext.onStop(() => {
      this.setData({
        onPlay: false
      })
    })
  },

  onTapFav(){
    db.checkFavorite(this.data.comment._id).then(res => {
      if (!res.data[0]) {
        db.addFav({id:this.data.comment._id})
      } else {
        db.removeFav({id:this.data.comment._id})
      }

    })
  },

  writeComment(){
    db.checkCollection(this.data.filmDetail._id).then(res =>{
      if (!res.data[0]){
        util.showCommentChoice(this.data.filmDetail)
      }else{
        wx.navigateTo({
          url: '/pages/commentDetail/commentDetail?id=' + res.data[0]._id
        })
      }
    })
  },

  onTapLogin(event) {
    this.setData({
      login:true
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