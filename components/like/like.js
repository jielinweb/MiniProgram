// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   like: {
     type: Boolean
   },
   count: {
     type: Number
   },
   readOnly: {
     type: Boolean
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function () {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count - 1 : count + 1;
      this.setData({
        like: !like,
        count: count
      });
      // 激活点赞状态
      let favorite = this.properties.like?'like':'cancel';
      // this.triggerEvent激活一个对象,该对象总共三个参数,一个字符串,后两个js对象
      this.triggerEvent('like', {
        favorite: favorite
      }, {});
    }
  }
})
