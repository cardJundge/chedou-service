// 转单
import dateTimePicker from '../../../dist/dateTimePicker.js'
Page({
  data: {
    paymentList: ['线下支付','线上支付'],
    payment: ''
  },

  onLoad: function (options) {
    this.setData({
      date: dateTimePicker.getNow(),
      company: options.company,
      businessType: options.businessType,
      businessNo: options.businessNo
    })
  },

  getMoneyInput(e) {
    this.data.money = e.detail.value
  },

  paymentChange(e) {
    this.data.paymentIndex = e.detail.value
    this.setData({
      payment: this.data.paymentList[this.data.paymentIndex]
    })
  },

  // 转单提交
  formSubmit(e) {
    if(this.data.payment == '线下支付') {

    } else if (this.data.payment == '线上支付') {
      wx.navigateTo({
        url: './payment/payment?money=' + this.data.money,
      })
    }
  }
})