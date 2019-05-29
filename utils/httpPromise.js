import { config } from '../config.js'

// 返回的错误信息
const tips = {
  101: '抱歉,出现了一个错误',
  102: 'appkey无效',
  103: '期刊不存在' 
}

class HTTP {
  // constructor() {
  //   this.baseRestUrl = config.api_blink_url
  // }
  // {} 对象结构方式
  request({ url, data = {}, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    })
  }
  // 如果外部没有传递,设置默认值 data={}, method="get"
  _request(url, resolve, reject, data={}, method='GET') {
    const _url = config.api_blink_url + url;
    const that = this;
    // wx.request: 异步请求
    wx.request({
      url: _url,
      data: data,
      method: method,
      header: {
        "content-type": 'application/json',
        'appkey': config.appkey
      },
      success: function (res) {
        // startsWith  以什么开头
        // endsWith  以什么结尾
        // 将code转换成字符串
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          // 这里不需要传参
          reject();
          let err_code = res.data.error_code;
          // this._showError(err_code);
          that._showErr (err_code);
        }
      },
      fail: (err) => {
        reject();
        that._showErr(101);
      }
    })
  }

  _showErr (err_code) {
    if (!err_code) {
      err_code = 101
    }
    let tip = tips[err_code];
    wx.showToast({
      title: tip ? tip : tips[101],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}