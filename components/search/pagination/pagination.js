// 分页行为  behaviors 是用于组件间代码共享的特性
const paginationBev = Behavior({
  data: {
    bookData: [], // 书籍基本信息
    total: 0, // 总记录数
    noneResult: false, // 没有搜索到书籍
    searching: false, // 搜索列表显示与隐藏
    loading: false, // 下拉加载小圆点,,防止多次无用的加载
  },
  methods: {
    // 接收一个数组,将新的数据合并到data的bookData里边
    setMoreData(bookData) {
      const tempArray = this.data.bookData.concat(bookData) // 数据合并
      this.setData({
        bookData: tempArray
      })
    },
    getCurrentStar() {
      return this.data.bookData.length; // 起始的记录数
    },
    setTotal(total) {
      this.data.total = total; // 设置总记录数
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    // 是否还有更多的数据需要加载,解决向服务器发送无效请求的问题
    hasMore() {
      if (this.data.bookData.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },
    // 加锁操作
    locke() {
      this.setData({
        loading: true
      })
    },

    // 解锁状态
    unlocke() {
      this.setData({
        loading: false
      })
    },

    // 显示加载小圆点
    showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    initialize() {
      this.data.total = null;
      this.setData({
        bookData: [], // 清空数据
        noneResult: false,
        loading: false
      })
    }
  }
})

export {
  paginationBev
}