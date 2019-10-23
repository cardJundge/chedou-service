var app = getApp()

class HTTP {
  constructor() {
    this.baseUrl = app.globalData.hostName
  }
  //http请求
  request(params) {
    wx.request({
      url: this.baseUrl + params.url,
      method: params.type,
      header: {
        'Accept': 'application/json',
        // 'Cookie': 'PHPSESSID=' + that.data.sessionId
        'Authorization': params.auth ? 'Bearer ' + app.globalData.userInfo.api_token: ''      
      },
      data: params.data,
      success: res => {
        params.sCallback && params.sCallback(res)
      },
      fail: err => {
        params.sCallback && params.sCallback(err)
      }
    })
  }
}

export { HTTP }