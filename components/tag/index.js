// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  // 启动slot插槽
  options: {
    multipleSlots: true
  },

  // 引用外部class样式
  externalClasses: ['tag-class'],

  properties: {
    text: String,
    num: Number
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
    onTap: function (event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})
