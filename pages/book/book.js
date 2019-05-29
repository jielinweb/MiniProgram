import {
  BookModel
} from '../../models/book.js';

import {
  Random
} from '../../utils/random.js';

const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    // 搜索组件显示状态
    searching: false,
    // 下拉触发状态
    more: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 利用promise避免了回调地狱
    const hotList = bookModel.getHotlist();
    hotList.then((res) => {
      this.setData({
        books: res
      })
    })
  },

  onSearch: function() {
    this.setData({
      searching: true
    })
  },

  // 取消按钮事件
  onCancel: function() {
    this.setData({
      searching: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more: Random(16)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})