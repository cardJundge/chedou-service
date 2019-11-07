// 调查详情
var app = getApp()
var test = getApp().globalData.hostName
import WxValidate from '../../../../dist/WxValidate.js'
import util from '../../../../utils/util.js'
Page({
  data: {
    fromData: {
      reportNo: ''
    }
  },
  onLoad: function (options) {
    this.setData({
      time: util.formatTime(new Date())
    })
    this.initValidate() // 验证规则函数
  },
  initValidate() {
    const rules = {
      reportNo: {
        required: true
      },
      recognizee: {
        required: true
      },
      mobile: {
        required: true,
        tel: true
      },
      driver: {
        required: true
      },
      driverMobile: {
        required: true,
        tel: true
      },
      carNo: {
        required: true
      },
      carModel: {
        required: true
      },
      surveyAddress: {
        required: true
      },
      surveyDate: {
        required: true
      },
      principal: {
        required: true
      },
      verifyContent: {
        required: true
      },
      surveyDate: {
        required: true
      }

    }
    const messages = {
      reportNo: {
        required: '请填写报案号'
      },
      recognizee: {
        required: '请填写被保险人姓名'
      },
      mobile: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      driver: {
        required: '请填写驾驶员姓名'
      },
      driverMobile: {
        required: '请填写驾驶员手机号',
        tel: '请填写正确的驾驶员手机号'
      },
      carNo: {
        required: '请填写车牌号'
      },
      carModel: {
        required: '请填写厂牌号'
      },
      surveyAddress: {
        required: '请填写出险地点'
      },
      surveyDate: {
        required: '请填写出险时间'
      },
      principal: {
        required: '请填写委托人姓名'
      },
      verifyContent: {
        required: '请填写核实内容'
      },
      surveyContent: {
        required: '请填写调查内容'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit(e) {
    console.log(e)
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: error.msg,
        icon: 'none'
      })
      return false
    } else {
      wx.request({
        url: test + '/api/work/increase',
        method: 'POST',
        data: {
          report_no: params.reportNo,      
          recognizee: params.recognizee,
          mobile: params.mobile,
          driver: params.driver,
          driver_mobile: params.driverMobile,
          car_no: params.carNo,
          car_model: params.carModel,
          survey_address: params.surveyAddress,
          survey_date: params.surveyDate,
          principal: params.principal,
          verify_content: params.verifyContent,
          survey_content: params.surveyContent,
          key: 'risk',
        },
        header: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + app.globalData.userInfo.api_token
        },

        success: res=> {
          if(res.data.status == 1) {
            wx.showToast({
              title: '添加成功',
            })
          } else if (res.data.status == -1) {
          } else {
            wx.showToast({
              title: res.data.msg ? res.data.msg : '请求超时',
            })
          }
        }
      })
    }
  }
})