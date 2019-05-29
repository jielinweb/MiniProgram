// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      // 获取图书的id号
      const bid = this.properties.book.id
      // this.triggerEvent('book', {
      //   bid: this.properties.book.id
      // }, {})
      wx.navigateTo({
        url: `/pages/detail/detail?bid=${bid}`
      })
    }
    // onTap: function (event) {
    //   this.triggerEvent('booktap', {
    //     bid: this.properties.book.id
    //   }, {})
    //   wx.navigateTo({
    //     url: '../../pages/detail/detail?bid=' + this.properties.book.id,
    //   })
    // }
  }
})
