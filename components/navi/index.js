// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    last: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: "images/triangle.dis@left.png",
    leftSrc: "images/triangle@left.png",
    disRightSrc: "images/triangle.dis@right.png",
    rightSrc: "images/triangle@right.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (event) {
      // 事件的监听
      // 如果没有最新的期刊就触发该事件
      if (!this.properties.last) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function (event) {
      // 如果不是第一期才触发该事件
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
