import { config } from '../config.js'

class HTTP {
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }
  request(params) {
    let url = this.baseRestUrl + params.url;
    if (!params.method) {
      params.method = "GET"
    }
    // wx.request: 异步请求
    wx.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        "content-type": 'application/json',
        'appkey': config.appkey
      },
      success: function (res) {
        // startsWith  以什么开头
        // endsWith  以什么结尾
        // 将code转换成字符串
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success && params.success(res.data);
        } else {
          params.error && params.error(res);
        }
      },
      fail: err => {
        params.fail && params.fail(err)

      }
    })
  }
}

export {HTTP}