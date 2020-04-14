// 增值服务添加客户
Page({
  data: {
    servicePack: ['增值服务包1','增值服务包2'],
    packVal: ''
  },

  onLoad(options) {

  },

  // 获取用户姓名
  getInputName() {

  },

  // 获取用户电话
  getInputMobile() {
    
  },

  packSelect(e) {
    console.log(e)
    this.setData({
      packVal: this.data.servicePack[e.detail.value]
    })
  }
})