// miniprogram/pages/home/home.js
const db = require('../../utils/db')
const util = require('../../utils/util')
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
    this.loadIndex()
  },
loadIndex(){
  wx.showLoading({
    title: 'Loading...',
  })
  db.getMovieList().then(result => { //下载电影数据并保存在本地
    wx.hideLoading()
    const data = result.data
    wx.setStorageSync('filmData', data)
    var randomFilm = Math.floor(Math.random() * 10) //首页展示一个随机电影
    this.setData({
      filmDetail: data[randomFilm],
      randomNumber: randomFilm
    })
    db.getAllComments(this.data.filmDetail._id).then(res => {
      const commentNum = res.data.length
      const randomComments = Math.floor(Math.random() * commentNum)
      this.setData({
        comment: res.data[randomComments]
      })
    })
  })
},

onPullDownRefresh(){
  this.loadIndex()
  wx.stopPullDownRefresh()
},
  onTapHotFilm() { //去热门电影页
    util.toPage('hotFilm')
  },
  onTapDetailPage(event) { //去电影详情页
    util.toPage('detailPage', event)
  },
  onTapPersonal() { //去个人页
    util.toPage('personal')
  },
  onTapCommentPage(){
    wx.navigateTo({
      url: '/pages/commentDetail/commentDetail?id=' + this.data.comment._id,
    })
  }
})