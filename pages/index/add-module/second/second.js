// 添加模块---》第二步
Page({
  data: {
    fieldData: []
  },

  onLoad(options) {
    this.data.moduleName = options.moduleName
    this.data.moduleIcon = options.moduleIcon
  },

  onShow() {
    if (this.data.tempData) {
      this.data.fieldData[this.data.fieldId] = this.data.tempData
      console.log(this.data.fieldData)
      this.setData({
        fieldData: this.data.fieldData
      })
    }
  },

  // 增加字段
  addField() {
    this.data.fieldData.push({
      name: '',
      required: 1,
      type: 'text'
    })
    this.setData({
      fieldData: this.data.fieldData
    })
  },

  // 删除字段
  delField(e) {
    let fieldIndex = e.currentTarget.dataset.index
    console.log(fieldIndex, this.data.fieldData)
    this.data.fieldData.forEach((item, index) => {
      if (fieldIndex == index) {
        this.data.fieldData.splice(index, 1)
      }
    })
    this.setData({
      fieldData: this.data.fieldData
    })
  },

  getFieldInput(e) {
    let fieldIndex = e.currentTarget.dataset.index
    this.data.fieldData.forEach((item, index) => {
      if (fieldIndex == index) {
        this.data.fieldData[index].name = e.detail.value
      }
    })
    this.setData({
      fieldData: this.data.fieldData
    })
    console.log(this.data.fieldData)
  },

  // 选择类型
  toSelectType(e) {
    let fieldType = e.currentTarget.dataset.type
    let fieldName = e.currentTarget.dataset.name
    let fieldRequired = e.currentTarget.dataset.required
    this.data.fieldId = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../select/select?flag=' + 'info' + '&name=' + fieldName + '&type=' + fieldType + '&required=' + fieldRequired,
    })
  },

  // 下一步
  nextStep() {
    if (this.data.fieldData.length == 0) {
      return wx.showToast({
        title: '任物流信息不能为空',
        icon: 'none'
      })
    } else {
      let arr = []
      this.data.fieldData.forEach((item, index) => {
        arr.push(item.name)
      })
      if (arr.includes("")) {
        return wx.showToast({
          title: '名称不能为空',
          icon: 'none'
        })
      }
    }
    let data = JSON.stringify(this.data.fieldData)
    wx.navigateTo({
      url: '../third/third?moduleName=' + this.data.moduleName + '&moduleIcon=' + this.data.moduleIcon + '&fieldData=' + data,
    })
  }
})