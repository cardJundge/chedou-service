// 管理者审批
Page({
  data: {
    
  },

  onLoad(options) {
    this.setData({
      approvalData: JSON.parse(options.approvalData),
    })
  },

  onShow() {
    if (this.data.tempData) {
      this.data.approvalData[this.data.approvalId] = this.data.tempData
      console.log(this.data.approvalData)
      this.setData({
        approvalData: this.data.approvalData
      })
    }
  },

  toSelectType(e) {
    let approvalType = e.currentTarget.dataset.type
    let approvalRequired = e.currentTarget.dataset.required
    let approvalName = e.currentTarget.dataset.name
    this.data.approvalId = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../select/select?flag=' + 'approval' + '&name=' + approvalName + '&type=' + approvalType + '&required=' + approvalRequired,
    })
  },

  // 添加审核字段
  addApprovalField() {
    this.data.approvalData.push({
      name: '',
      required: 1,
      type: 'text'
    })
    this.setData({
      approvalData: this.data.approvalData
    })
  },

  // 删除审核**
  delApprovalField(e) {
    let approvalIndex = e.currentTarget.dataset.index
    this.data.approvalData.forEach((item, index) => {
      if (approvalIndex == index) {
        this.data.approvalData.splice(index, 1)
      }
    })
    this.setData({
      approvalData: this.data.approvalData
    })
  },

  getApprovalInput(e) {
    let approvalIndex = e.currentTarget.dataset.index
    this.data.approvalData.forEach((item, index) => {
      if (approvalIndex == index) {
        this.data.approvalData[index].name = e.detail.value
      }
    })
    this.setData({
      approvalData: this.data.approvalData
    })
    console.log(this.data.approvalData)
  },

  // 点击确定按钮
  onConfirm() {
    if (this.data.approvalData.length == 0) {
      return wx.showToast({
        title: '客户评价不能为空',
        icon: 'none'
      })
    } else {
      let arr = []
      this.data.approvalData.forEach((item, index) => {
        arr.push(item.name)
      })
      if (arr.includes("")) {
        return wx.showToast({
          title: '名称不能为空',
          icon: 'none'
        })
      }
    }
    let data = JSON.stringify(this.data.approvalData)
    var pages = getCurrentPages()
    var currPage = pages[pages.length - 1] //当前页面
    var prevPage = pages[pages.length - 2] //上一个页面
    prevPage.setData({
      approvalData: this.data.approvalData
    })
    wx.navigateBack({
      delta: 1
    })
  },
})