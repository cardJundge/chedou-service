// 管理者审批弹框
Component({
  properties: {
    isShow: {
      type: Boolean
    },
    approvalBoxName: {
      type: String
    },
    approvalType: {
      type: String
    }
  },

  data: {

  },

  methods: {
    toCloseModule() {
      this.setData({
        isShow: false
      })
    },

    getTextInput(e) {
      this.setData({
        textValue: e.detail.value
      })
    },

    getIntInput(e) {
      this.setData({
        intValue: e.detail.value
      })
    },

    // 确定
    toConfirm() {
      this.setData({
        isShow: false
      })
      if (this.data.approvalType == 'text') {
        this.triggerEvent('boxConfirm', { approvalBoxName: this.data.approvalBoxName, approvalBoxVal: this.data.textValue })
      } else if (this.data.approvalType == 'int'){
        this.triggerEvent('boxConfirm', { approvalBoxName: this.data.approvalBoxName, approvalBoxVal: this.data.intValue })
      }
    }
  }
})
