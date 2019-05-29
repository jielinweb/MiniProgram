// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      // observer函数包含三个参数,newVal:改变后的值, oldVal:之前的值, changedPath:改变的路径
      // 不要在该函数下改变属性的值,否则会出现无限递归的情况
      observer: function(newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0'+newVal:newVal;
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    monthAry: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    year: 0,
    month: '',
    _index: ''
  },

  // 生命周期函数，在组件实例进入页面节点树时执行
  attached: function() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.setData({
      month: this.data.monthAry[month],
      year: year
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
