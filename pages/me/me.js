import {
  BookModel
} from '../../models/book.js'

import {
  ClassicModel
} from '../../models/classic.js'

const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,   // 头像显示
    userInfo: null,   // 用户信息
    myBooksCount: Number,   // 喜欢的书
    classicList: []  // 书籍信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized();
    this.getFavCount();
    this.getFavBook();
  },

  userAuthorized() {
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res => {
              this.setData({
                hasUserInfo: true,
                userInfo: res.userInfo
              })
              console.log(res)
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  },

  // 获取用户信息
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    this.setData({
      hasUserInfo: true,
      userInfo
    })
  },

  // 获取喜欢的书籍数量
  getFavCount() {
    bookModel.getFavoriteBook().then(res => {
      let count = res.count;
      this.setData({
        myBooksCount: count
      })
    })
  },

  // 获取书籍信息
  getFavBook() {
    classicModel.getMyFavor(data => {
      this.setData({
        classicList: data
      })
    })
  },

  // 点击跳转详情页
  onPreviewTap (event) {
    let cid = event.detail.cid;
    let type = event.detail.type;
    wx.navigateTo({
      url: '/pages/classic-detail/index?cid='+event.detail.cid+'&type='+event.detail.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})