// 客户评价
Page({
  data: {

  },

  onLoad(options) {
    this.setData({
      evaluateData: JSON.parse(options.evaluateData),
    })
  },

  onShow() {
    if (this.data.tempData) {
      this.data.evaluateData[this.data.evaluateId] = this.data.tempData
      console.log(this.data.evaluateData)
      this.setData({
        evaluateData: this.data.evaluateData
      })
    }
  },

  toSelectType(e) {
    let evaluateType = e.currentTarget.dataset.type
    let evaluateRequired = e.currentTarget.dataset.required
    let evaluateName = e.currentTarget.dataset.name
    this.data.evaluateId = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../select/select?flag=' + 'evaluate' + '&name=' + evaluateName + '&type=' + evaluateType + '&required=' + evaluateRequired,
    })
  },

  // 添加评价字段
  addEvaluateField() {
    this.data.evaluateData.push({
      name: '',
      required: 1,
      type: 'text'
    })
    this.setData({
      evaluateData: this.data.evaluateData
    })
  },

  // 删除评价**
  delEvaluateField(e) {
    let evaluateIndex = e.currentTarget.dataset.index
    this.data.evaluateData.forEach((item, index) => {
      if (evaluateIndex == index) {
        this.data.evaluateData.splice(index, 1)
      }
    })
    this.setData({
      evaluateData: this.data.evaluateData
    })
  },

  getEvaluateInput(e) {
    let evaluateIndex = e.currentTarget.dataset.index
    this.data.evaluateData.forEach((item, index) => {
      if (evaluateIndex == index) {
        this.data.evaluateData[index].name = e.detail.value
      }
    })
    this.setData({
      evaluateData: this.data.evaluateData
    })
    console.log(this.data.evaluateData)
  },

  // 点击确定按钮
  onConfirm() {
    if (this.data.evaluateIndex.length == 0) {
      return wx.showToast({
        title: '客户评价不能为空',
        icon: 'none'
      })
    } else {
      let arr = []
      this.data.evaluateIndex.forEach((item, index) => {
        arr.push(item.name)
      })
      if (arr.includes("")) {
        return wx.showToast({
          title: '名称不能为空',
          icon: 'none'
        })
      }
    }
    let data = JSON.stringify(this.data.evaluateData)
    var pages = getCurrentPages()
    var currPage = pages[pages.length - 1] //当前页面
    var prevPage = pages[pages.length - 2] //上一个页面
    prevPage.setData({
      evaluateData: this.data.evaluateData
    })
    wx.navigateBack({
      delta: 1
    })
  },
})