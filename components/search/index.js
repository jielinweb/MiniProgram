// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  paginationBev
} from './pagination/pagination.js'

const keywModel = new KeywordModel()

Component({
  // 使用behaviors继承属性跟方法
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      // 实现下拉加载数据
      observer: function() {
        // 如果没有值就不触发
        if (!this.data.val) {
          return
        }
        // 优化加载,避免重复的加载数据
        if (this.isLocked()) {
          return
        }

        // 是否有更多的记录,如果没有return
        let hasMore = this.hasMore();
        if (!hasMore) {
          return
        }

        // 如果有更多的数据则执行下面的方法
        if (hasMore) {
          this.locke(); //加锁
          // getCurrentStar 起始记录数
          keywModel.search(this.getCurrentStar(), this.data.val).then(res => {
            this.setMoreData(res.books);  // 合并添加的数据
            this.unlocke(); // 解锁
          }, () => {
            this.unlocke(); // 断网后避免死锁
          })
        }
        // const len = this.data.bookData.length;
        // this.locke(); // 加锁
        // keywModel.search(len, this.data.val).then(res => {
        //   console.log(res)
        //   // 将新获取的数据与之前的数据合并
        //   const concatData = this.data.bookData.concat(res.books);
        //   // 设置总记录书
        //   this.setTotal(res.total);
        //   // 将数据绑定更新
        //   this.setData({
        //     bookData: concatData
        //   })
        //   this.unlocke(); // 请求成功后解锁
        // }, () => {
        //   this.unlocke(); // 失败的时候也需要解锁
        // })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotKeys: [],
    loadingCenter: false, // 数据加载中间小圆点
    // 加载状态
    loading: false,
    // 输入框的值
    val: ''
  },

  attached() {
    const historyWords = keywModel.getHistory();
    const hotKeys = keywModel.getHot();
    // 更新历史搜索数据
    this.setData({
      historyWords
    })

    // 更新热门搜索关键词
    hotKeys.then(res => {
      this.setData({
        hotKeys: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel: function(event) {
      this.initialize();  // 清空相关数据
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm: function(event) {
      // 搜索返回数据之前进行初始化
      this.showResult();
      this.initialize();
      this.showLoadingCenter();
      // 接受两个值,一个是输入框的值,另一个是点击传递过来的值
      const text = event.detail.value || event.detail.text;
      // 书籍搜索请求
      const bookList = keywModel.search(0, text);
      bookList.then(res => {
        this.setData({
          val: text
        });
        // 返回合并后的书籍列表
        this.setMoreData(res.books);
        // 设置总记录数
        this.setTotal(res.total);
        // 数据请求成功后才添加缓存
        keywModel.addHistory(text);
        // 隐藏小圆点
        this.hideLoadingCenter();
      })
    },

    // 取消关键词搜索
    onDelete: function() {
      this.initialize();  // 清空相关数据
      this.hideResult();
    },
    // 显示搜索信息
    showResult() {
      this.setData({
        searching: true
      })
    },
    // 隐藏搜索信息
    hideResult() {
      this.setData({
        searching: false,
        val: '' // 输入框的值设置为空
      })
    },

    // 判断当前是否已经加了锁
    isLocked() {
      return this.data.loading ? true : false
    },

    // 隐藏加载小圆点
    hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})