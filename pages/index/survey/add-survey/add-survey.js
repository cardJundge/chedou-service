// 添加查勘定损
import dateTimePicker from '../../../../dist/dateTimePicker.js'
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    isRegion: true,
    taskPingan: false,
    regionPingan: false,
    isCarNo: false,
    isTimeSlot: false, // 是否有派工时间段(平安)
    isDispatchingTime: true, // 派工时间（太平没有)
    isDispatchedWorkers: true, // 派工人(太平、平安没有)
    isFixedLossAdd: false, //出险/定损地点(太平、平安有)
    isReportTime: false, // 报案时间(太平有)
    isJobNo: false, // 工号(太平、平安有)
    isSurveyTime: false, // 查勘日期(平安有)
    isreportType: false, //案件类型（太平有）
    isPolicyNo: true, // 保单号(平安、太平有)
    isPolicyMechanism: true, // 承保机构（平安、太平有）
    // -------------------------------------------------
    fixedLossAdd: '',
    carNo: '',
    reportNo: '',
    remarks: '',
    policyNo: '',
    policyMechanism: '',
    // -------------------------------------------------
    isAnalysis: true,
    insuranceList: [],
    insuranceIndex: 0,
    isThreeRes: false,
    dateTimeArray: null,
    dateTime: null,
    hasInsuranceName: '',
    // 平安
    taskModesPingan: ["现场查勘(拍摄标的照片)", "现场查勘(仅有自拍照片)", "现场未勘", "非现场查勘", "协助现场", "协助定损", "标的定损", "三责定损", "已勘销案", "人伤快赔", "物损"],
    // 其他保险公司
    taskModesOther: ["现场查勘", "非现场查勘", "人伤查勘", "标的定损", "三责定损", "物损"],
    // 平安区域选择
    regionListPingan: [
      ["郊县", "城区"],
      ["长安韦曲", "长安郭社", "长安航天", "蓝田", "高陵", "周至", "户县", "临潼", "阎良"]
    ],
    regionIndexPingan: [0, 0],
    // 其他保险公司区域选择
    regionListOther: ["东郊", "西郊", "北郊", "南郊"],
    // 平安派工时间段
    timeSlotListPingan: [
      ["白班", "小夜班", "大夜班"],
      ["07:00-18:00"]
    ],
    timeSlotIndexPingan: [0, 0],
    // 太平案件类型
    reportType: ["整案损失5000以内(纯车物)", "整案损失5000以内(纯车物视频定损)", "整案损失超5000", "整案损失超5000(视频定损)", "含人伤现场查勘", "人伤一案到底", "已勘销案"],
  },

  onLoad: function(options) {
    this.getInsuranceList()
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear)
    this.setData({
      dateTimeArray: obj.dateTimeArray,
      dateTime: obj.dateTime
    })
  },

  taskChangeOther(e) {
    this.setData({
      taskIndexOther: e.detail.value
    })
  },

  taskChangePingan(e) {
    this.setData({
      taskIndexPingan: e.detail.value
    })
  },

  regionChangeOther(e) {
    this.setData({
      regionIndexOther: e.detail.value
    })
  },

  changedateTime(e) {
    this.setData({
      dateTime: e.detail.value
    })
  },

  changeDateTimeColumn(e) {
    console.log(e)
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray

    arr[e.detail.column] = e.detail.value
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    })
  },

  // 区域选择
  regionChangePingan(e) {
    console.log(e)
    this.setData({
      regionIndexPingan: e.detail.value
    })
  },

  regionChangeColumnPingan(e) {
    console.log(e.detail.column, e.detail.value)
    var data = {
      regionListPingan: this.data.regionListPingan,
      regionIndexPingan: this.data.regionIndexPingan
    }
    data.regionIndexPingan[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.regionIndexPingan[0]) {
          case 0:
            data.regionListPingan[1] = ["长安韦曲", "长安郭社", "长安航天", "蓝田", "高陵", "周至", "户县", "临潼", "阎良"]
            break
          case 1:
            data.regionListPingan[1] = ["未央路东(南)", "未央路东(北)", "未央路西", "西二环内", "东二环内", "南二环内", "北二环内", "城墙内(东)", "城墙内(西)", "西二环外", "三桥(南)", "三桥(北)", "高新南"]
            break
        }
        data.regionIndexPingan[1] = 0
        break
    }
    this.setData(data)
  },

  // 时间段选择（平安）
  timeChangePingan(e) {
    console.log(e)
    this.setData({
      timeSlotIndexPingan: e.detail.value
    })
  },

  timeChangeColumnPingan(e) {
    console.log(e.detail.column, e.detail.value)
    var data = {
      timeSlotListPingan: this.data.timeSlotListPingan,
      timeSlotIndexPingan: this.data.timeSlotIndexPingan
    }
    data.timeSlotIndexPingan[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.timeSlotIndexPingan[0]) {
          case 0:
            data.timeSlotListPingan[1] = ["07:00-18:00"]
            break
          case 1:
            data.timeSlotListPingan[1] = ["18:00-21:00"]
            break
          case 2:
            data.timeSlotListPingan[1] = ["21:00-07:00"]
            break
        }
        data.timeSlotIndexPingan[1] = 0
        data.timeSlotIndexPingan[2] = 0
        break
    }
    this.setData(data)
  },

  // 选择报案时间
  reportTimeChange(e) {
    console.log(e)
    this.setData({
      reportTime: e.detail.value
    })
  },

  // 选择查勘时间
  surveyTimeChange(e) {
    console.log(e)
    this.setData({
      surveyTime: e.detail.value
    })
  },

  // 太平案件类型
  reportTypeChange(e) {
    this.setData({
      reportIndex: e.detail.value
    })
  },

  surveyRadioChange(e) {
    let data = e.detail.value
    if (data == 'survey') {
      this.setData({
        isThreeRes: false
      })
    } else {
      this.setData({
        isThreeRes: true
      })
    }
  },

  surveyRadioChange01(e) {

  },

  // 获取保险公司列表
  getInsuranceList() {
    indexModel.getInsurance(res => {
      if (res.data.status == 1) {
        let array = []
        res.data.data.forEach((item, index) => {
          array.push(item.name)
        })
        this.data.insuranceList = res.data.data
        this.setData({
          insuranceNameList: array
        })
      }
    })
  },

  // 保险公司选择
  insuranceChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.insuranceIndex = e.detail.value
    this.setData({
      hasInsuranceName: this.data.insuranceNameList[this.data.insuranceIndex]
    })
    this.data.insuranceList.forEach((item, index) => {
      if (index == e.detail.value) {
        this.changeShow(item.name)
      }
    })
  },

  // 保险公司不同对应显示内容不同
  changeShow(flag) {
    if (flag == '中国平安') {
      this.setData({
        isRegion: true,
        taskPingan: true,
        regionPingan: true,
        isCarNo: true,
        isTimeSlot: true,
        isDispatchingTime: true,
        isDispatchedWorkers: false,
        isFixedLossAdd: true,
        isReportTime: false,
        isJobNo: true,
        isSurveyTime: true,
        isreportType: false,
        isPolicyNo: false,
        isPolicyMechanism: false
      })
    } else if (flag == '中国太平') {
      this.setData({
        isRegion: false,
        taskPingan: false,
        isCarNo: true,
        isTimeSlot: false,
        isDispatchingTime: false,
        isDispatchedWorkers: false,
        isFixedLossAdd: true,
        isReportTime: true,
        isJobNo: true,
        isSurveyTime: false,
        isreportType: true,
        isPolicyNo: false,
        isPolicyMechanism: false
      })
    } else {
      this.setData({
        isRegion: true,
        taskPingan: false,
        regionPingan: false,
        isCarNo: false,
        isTimeSlot: false,
        isDispatchingTime: true,
        isDispatchedWorkers: true,
        isFixedLossAdd: false,
        isReportTime: false,
        isJobNo: false,
        isSurveyTime: false,
        isreportType: false,
        isPolicyNo: true,
        isPolicyMechanism: true
      })
    }
  },

  toHandWriting() {
    this.setData({
      isAnalysis: !this.data.isAnalysis
    })
  },

  reportNoInput(e) {
    this.data.reportNo = e.detail.value
  },

  carNoInput(e) {
    this.data.carNo = e.detail.value
  },

  fixedLossAddInput(e) {
    this.data.fixedLossAdd = e.detail.value
  },

  policyNoInput(e) {
    this.data.policyNo = e.detail.value
  },

  policyMechanismInput(e) {
    this.data.policyMechanism = e.detail.value
  },

  // 表单提交案件添加
  formSubmit(e) {
    console.log(e.detail.value)
    const params = e.detail.value
    if (!this.data.hasInsuranceName) {
      return wx.showToast({
        title: '保险公司不能为空',
        icon: 'none'
      })
    }

    if (this.data.isSurveyTime && !this.data.surveyTime) {
      return wx.showToast({
        title: '请选择查勘日期',
        icon: 'none'
      })
    }

    if (!this.data.reportNo) {
      return wx.showToast({
        title: '案件号不能为空',
        icon: 'none'
      })
    }

    if (this.data.isCarNo && !this.data.carNo) {
      return wx.showToast({
        title: '车牌号不能为空',
        icon: 'none'
      })
    }

    if ((!this.data.taskPingan && !this.data.taskModesOther[this.data.taskIndexOther]) || (this.data.taskPingan && !this.data.taskModesPingan[this.data.taskIndexPingan])) {
      return wx.showToast({
        title: '请选择任务类型',
        icon: 'none'
      })
    }

    if (this.data.isReportTime && !this.data.reportTime) {
      return wx.showToast({
        title: '请选择报案时间',
        icon: 'none'
      })
    }

    if (this.data.isFixedLossAdd && !this.data.fixedLossAdd) {
      return wx.showToast({
        title: '出险/定损地点不能为空',
        icon: 'none'
      })
    }

    if (this.data.isreportType && !this.data.reportType[this.data.reportIndex]) {
      return wx.showToast({
        title: '请选择案件类型',
        icon: 'none'
      })
    }
  },

  // 解析短信
  toAnalysis(e) {
    let shortInfoData = e.detail.value.message
    let carReg = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i
    if (!shortInfoData) {
      return wx.showToast({
        title: '短信不能为空',
        icon: 'none'
      })
    }

    this.setData({
      isAnalysis: false,
      remarks: shortInfoData
    })

    // 匹配查勘定损
    let surveyReg = /查勘/
    let targetReg = /标的/
    let threeResReg = /三责/
    if (shortInfoData.match(surveyReg)) {
      this.setData({
        isThreeRes: false
      })
    } else if (shortInfoData.match(targetReg)) {
      this.setData({
        isThreeRes: true,
        targetChecked: true
      })
    } else if (shortInfoData.match(threeResReg)) {
      this.setData({
        isThreeRes: true,
        targetChecked: false
      })
    }

    // 匹配保险公司名字
    let insuranceNameReg01 = /【[\u4e00-\u9fa5]{2,}】/
    let insuranceNameReg02 = /[\u4e00-\u9fa5]{2,}/
    if (shortInfoData.match(insuranceNameReg01)) {
      let insuranceName = shortInfoData.match(insuranceNameReg01)[0].match(insuranceNameReg02)[0]
      if (insuranceName == '平安产险') {
        insuranceName = '中国平安'
      }
      this.setData({
        hasInsuranceName: insuranceName
      })
      this.changeShow(insuranceName)
    } else {
      console.log('解析不出保险公司名字')
    }

    // 不同保险公司信息匹配
    if (this.data.hasInsuranceName == '中国平安') {
      shortInfoData = shortInfoData.replace('【中国平安】', '')
      // 匹配中国平安出险地点
      let addressReg = /陕西省.[\u4e00-\u9fa5\\-\a-zA-Z0-9]+/i
      if (shortInfoData.match(addressReg)) {
        this.setData({
          fixedLossAdd: shortInfoData.match(addressReg)[0].substring(0, 30)
        })
      }

      // 匹配中国平安车牌号
      if (shortInfoData.match(carReg)) {
        console.log(shortInfoData.match(carReg)[0])
        this.setData({
          carNo: shortInfoData.match(carReg)[0]
        })
      }

      // 匹配中国平安的报案号
      var caseReg = /(\d){13,}/i
      if (shortInfoData.match(caseReg)) {
        this.setData({
          reportNo: shortInfoData.match(caseReg)[0]
        })
      }
    } else if (this.data.hasInsuranceName == '国任保险') {
      // 国任保险报案号解析
      var caseReg01 = /(\d){13,}/i
      var caseReg02 = /报案号.\d+/i
      if (shortInfoData.match(caseReg01)) {
        this.setData({
          reportNo: shortInfoData.match(caseReg01)[0]
        })
      } else if (shortInfoData.match(caseReg02)) {
        this.setData({
          reportNo: shortInfoData.match(caseReg02)[0]
        })
      } else {
        console.log('匹配不到国任保险的案件号')
      }
    } else if (this.data.hasInsuranceName == '中保车服') {
      // 中保车服报案号解析
      var caseReg = /报案号.\w+/i
      if (shortInfoData.match(caseReg)) {
        this.setData({
          reportNo: shortInfoData.match(caseReg)[0].substring(4, shortInfoData.match(caseReg)[0].length)
        })
      }
    }
  }
})