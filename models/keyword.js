import {
  HTTP
} from "../utils/httpPromise.js"

class KeywordModel extends HTTP {
  key = 'q'
  max = 10

  // 获取历史信息
  getHistory () {
    const words = wx.getStorageSync(this.key);
    // 判断是否为空
    if (!words) {
      return []
    }
    return words
  }

  // 获取热门信息
  getHot () {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  // 将历史信息添加到缓存
  addHistory (word) {
    let keyword = this.getHistory();
    let has = keyword.includes(word);
    // 如果缓存中不存在
    if (!has) {
      // 长度限制
      let len = keyword.length;
      if (len >= this.max) {
        // 数组末尾删除
        keyword.pop();
      }
      // 将数组查到到keyword前面
      keyword.unshift(word);
      wx.setStorageSync(this.key, keyword)
    }
  }

  // 书籍搜索
  search (start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        start: start,
        q: q
      }
    })
  }
}

export {
  KeywordModel
}