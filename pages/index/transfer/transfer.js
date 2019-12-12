// 转单
Page({
  data: {
    paymentList: ['线下支付','钱包账户','微信'],
    payment: ''
  },

  onLoad: function (options) {

  },

  paymentChange(e) {
    this.data.paymentIndex = e.detail.value
    this.setData({
      payment: this.data.paymentList[this.data.paymentIndex]
    })
  }
})