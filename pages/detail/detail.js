import {
  BookModel
} from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,       // 书籍基本信息
    noComment: true, 
    likeStatus: false,   // 收藏状态
    likeCount: 0,     // 收藏数量
    posting: false,    // 评论输入框显示隐藏状态

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 显示 loading 提示框
    wx.showLoading();
    // 接收外部传递过来的id
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const short_comment = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    // 使用Promise.all并发请求
    Promise.all([detail, short_comment, likeStatus]).then(res => {
      this.setData({
        // 获取书籍的基本信息
        book: res[0],
        // 获取短评内容
        noComment: res[1].comments == false ? true : false,
        comments: res[1].comments,
        // 获取喜欢状态和数量
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      // 数据加载完毕后关闭loading提示框
      wx.hideLoading();
    })

    // 获取书籍的基本信息
    // detail.then((res) => {
    //   this.setData({
    //     book: res
    //   })
    // })

    // 获取短评内容
    // short_comment.then((res) => {
    //   this.setData({
    //     noComment: res.comments == false ? true : false,
    //     comments: res.comments
    //   })
    // })

    // 获取喜欢状态和数量
    // likeStatus.then((res) => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },

  // 根据id与类型获取对应的详情


  // 显示与隐藏评论
  onFakePost: function () {
    this.setData({
      posting: !this.data.posting
    })
  },

  // 点击发送短评
  onPost: function (event) {
    // 获取发送的内容
    let comment = event.detail.value || event.detail.text;
    if (!comment) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评不能超过12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '短评+1',
        icon: 'none'
      })

      // 将短评添加到评论列表
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      // 短评数据更新
      this.setData({
        comments: this.data.comments,
        noComment: false,
        posting: false
      })
    })
  },

  // 取消事件
  onCancel: function () {
    this.setData({
      posting: !this.data.posting
    })
  },

  // 收藏事件
  onLike: function (event) {
    let like = event.detail.favorite;
    // 400代表书籍类型
    likeModel.like(like, this.data.book.id, 400)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})