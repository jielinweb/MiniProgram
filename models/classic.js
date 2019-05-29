import {
  HTTP
} from '../utils/http.js'

class ClassicModel extends HTTP {

  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (data) => {
        // 如果不用箭头函数，this将指代不正确
        // 每次获取到数据都将classic写入到缓存中
        sCallback(data);
        this._setLatestIndex(data.index);
        let key = this._getKey(data.index);
        wx.setStorageSync(key, data);
      }
    })
  }

  // 上一页
  // getPrev(sCallback, index) {

  // }

  // 获取上一页下一页
  getClassic(index, category, sCallback) {
    // 在缓存中查找 or API写入到缓存中
    let key = category == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    // 在缓存中寻找classic
    let classic = wx.getStorageSync(key);
    // 如果没有找到就向服务器发送请求
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + category,
        success: (data) => {
          // 将服务器的数据写入到缓存中
          wx.setStorageSync(this._getKey(data.data), data);
          sCallback(data);
          // 获取缓存的index
          // this._setLatestIndex(data.index);
        }
      })
    } else {
      sCallback(classic);
    }

  }

  // 下一页
  // getNext(index, sCallback) {
  //   this.request({
  //     url: 'classic/' + index + '/previous',
  //     success: (data) => {
  //       sCallback(data);
  //       // 获取缓存的index
  //       this._setLatestIndex(data.index);
  //     }
  //   })
  // }

  // 获取对应的详情内容
  getById(cid, type, success) {
    let params = {
      url: 'classic/' + type + '/' + cid,
      success: success
    }
    this.request(params)
  }

  // 是否第一期刊
  isFirst(index) {
    return index == 1 ? true : false;
  }

  // 是否最新期刊
  isNext(index) {
    let latestIndex = this._getLatestIndex();
    // 判断当前的index是否等于传递进来的index
    return index === latestIndex ? true : false;
  }

  // 获取喜欢的期刊
  getMyFavor(success) {
    this.request({
      url: 'classic/favor',
      success: success
    })
  }

  // 获取最新的index
  _setLatestIndex(index) {
    // 设置缓存,两个值(键 值) 同步写入缓存  数据量小用同步
    wx.setStorageSync('latest', index)
  }

  // 读取缓存
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index;
  }

  // 期刊的key
  _getKey(index) {
    let key = 'classic-' + index;
    return key;
  }
}

export {
  ClassicModel
}