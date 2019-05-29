// page/classic/classic.js
import {ClassicModel} from "../../models/classic.js"
import {LikeModel} from "../../models/like.js"
// 如果要使用类下面的实例方法,必须使用new实例化对象
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    last: true,
    // 喜欢的数量
    likeCount: 0,
    // 喜欢的状态
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid;
    const type = options.type;

    classicModel.getLatest((data) => {
      // 数据更新
      this.setData({
        // 扩展运算符,属性会平铺,展开的属性太多就不太适合用
        // ...data
        classic: data,
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })

  },

  // 是否收藏,向服务器发送请求
  onLike: function (event) {
    let favorite = event.detail.favorite;
    likeModel.like(favorite, this.data.classic.id, this.data.classic.type)
  },

  onPrev: function (event) {
    this._updateClassic('next');
  },

  onNext: function (event) {
    this._updateClassic('previous');
  },

  _updateClassic: function (category) {
    let index = this.data.classic.index;
    classicModel.getClassic(index, category, (res) => {
      // 调用like方法
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classic: res,
        // 更新first跟last的值(跟服务器的值做对比)
        first: classicModel.isFirst(res.index),
        last: classicModel.isNext(res.index)
      })
    })
  },

  // 根据id和类型获取详情
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
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