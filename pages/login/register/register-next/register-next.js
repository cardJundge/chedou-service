// 注册--》最后一步
import WxValidate from '../../../../dist/WxValidate.js'
import {
  LoginModel
} from '../../models/login.js'

var loginModel = new LoginModel()
Page({
  data: {
    register: {
      title: '注册车豆商户端账号'
    },
    formData: {
      company: '',
      companyType: ''
    },
    otherData: [],
    isDisabled: false,
    companyArray: [
      '公估公司', '4s店', '维修店','保险公司'
    ]
  },
  onLoad: function (options) {
    this.data.otherData = JSON.parse(options.params)
    
    this.initValidate() // 验证规则函数
  },

  initValidate() {
    const rules = {
      company: {
        required: true
      },
      companyType: {
        required: true
      }
    }
    const messages = {
      company: {
        required: '请填写公司名称'
      },
      companyType: {
        required: '请选择公司类型'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  bindCompanyChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      company: e.detail.value
    })
  },

  formSubmit(e) {
    let params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: error.msg,
        icon: 'none'
      })
      return false
    } else {
      this.setData({
        isDisabled: true
      })
      this.data.companyArray.forEach((item, index)=> {
        if (item == params.companyType) {
          this.data.otherData.companyType = index + 1
        }
      })
      this.data.otherData.company = params.company
      loginModel.postRegister(this.data.otherData, res=> {
        console.log(res)
        if(res.data.status == 1) {
          wx.showToast({
            title: '注册成功',
            success: res=> {
              wx.redirectTo({
                url: '../../login',
              })
              this.setData({
                isDisabled: false
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            success: res=> {
              this.setData({
                isDisabled: false
              })
            }
          })
        }
      })
    }
  }
})