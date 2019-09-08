// pages/personal/personal.js
const util = require('../../utils/util.js')
const db = require('../../utils/db.js')
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    listType:0,
    style1: 'border-bottom: 2px solid rgb(137, 190, 221)',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
   this.setList(this.data.listType)
  },

setList(listType){
  var poster = {}
  var name = {}
  var count = 0
  const filmData = wx.getStorageSync('filmData')
  for (var index in filmData) {
    var filmId = filmData[index]._id
    var url = filmData[index].poster
    var filmName = filmData[index].name
    poster[filmId] = url
    name[filmId] = filmName
    count = +1
  }
  if (listType==0){
  db.getCommentByUser('comment').then(res => {
    var comments = res.data
    for (var index in comments) {
      var filmId = comments[index].filmId
      comments[index]['poster'] = poster[filmId]
      comments[index]['name'] = name[filmId]
    }
    this.setData({
      comments
    })
    })
  } else {
    db.getCommentByUser('favorite').then(res => {
      var favorite = res.data
      this.favComment = []
      for (var index in favorite ){
        db.getCollection('comment',favorite[index].commentId).then(res=>{
          var comments = res.data
          for (var index in comments) {
            var filmId = comments[index].filmId
            comments[index]['poster'] = poster[filmId]
            comments[index]['name'] = name[filmId]
            this.favComment = this.favComment.concat(comments)
          }
          this.setData({
            comments:this.favComment
          })
        })

      }
    })

  }
},


  switchBtn(){
    if (this.data.listType == 0){
      this.setData({
        listType:1,
        style1:null,
        style2:'border-bottom: 2px solid rgb(137, 190, 221)'
      })
      this.setList(this.data.listType)
    }else{
      this.setData({
        listType: 0,
        style1: 'border-bottom: 2px solid rgb(137, 190, 221)',
        style2: null
      })
      this.setList(this.data.listType)
    }
  },
  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },
  onTapDetailPage(options){
    var id = options.currentTarget.dataset.id
    util.toComment('commentDetail',this.data.comments[id]._id)
  },
  onTapHome(event) {
    util.toPage('home')
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })},


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