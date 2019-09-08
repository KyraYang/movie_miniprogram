// pages/commentEditor/commentEditor.js
const util = require('../../utils/util.js')
const db = require('../../utils/db.js')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * Page initial data
   */
  data: {
    login: false,
    onPlay: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '编辑影评'
    })
    util.getUserInfo().then(userInfo => {
      this.userInfo = userInfo
      this.setData({
        login: true
      })
    })
    var filmDetail = (JSON.parse(options.filmDetail))
    this.setData({
      filmDetail: filmDetail,
      type: options.id,
    })
  },


  onTapLogin(event) {
    if (event.detail.userInfo) {
      this.setData({
        login: true
      })
    }
  },


  submitComment(options) {
    wx.showToast({
      title: '上传中...',
    })
    db.checkCollection(this.data.filmDetail._id).then(res => {
      if (!res.data[0]) {
        this.addComment(options)
      } else {
        console.log(res.data)
        db.removeComment({id:res.data[0]._id})
        this.addComment(options)
      }
    })

  },

  startRecord() {
    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options)
    this.setData({
      recording: 'background-color: rgba(196, 223, 250, 0.836)'
    })
  },

  endRecord() {
    recorderManager.stop()
    recorderManager.onStop((res) => {
      console.log(res)
      const tempFilePath = res.tempFilePath
      this.tempFilePath = tempFilePath
      this.setData({
        duration: Math.ceil(res.duration / 1000)
      })
    })
    this.setData({
      recording: 'background-color: rgb(247, 249, 251, 0.836)'
    })
  },

  playRecord() {
    innerAudioContext.src = this.tempFilePath
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

addComment(options){
  if (this.data.type == 0) {
    db.addComment({
      username: this.userInfo.nickName,
      avatar: this.userInfo.avatarUrl,
      filmId: this.data.filmDetail._id,
      comment: options.detail.value.textarea,
      type: this.data.type,
      duration: 0
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  } else {
    wx.cloud.uploadFile({
      cloudPath: `record/${util.getRandomId()}.mp3`,
      filePath: this.tempFilePath,
    }).then(res => {
      db.addComment({
        username: this.userInfo.nickName,
        avatar: this.userInfo.avatarUrl,
        filmId: this.data.filmDetail._id,
        comment: res.fileID,
        type: this.data.type,
        duration: this.data.duration
      }).catch(err => {
        console.error(err)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: 'Failed'
        })
      })
    })
  }
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