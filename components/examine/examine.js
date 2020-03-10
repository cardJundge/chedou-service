// 审核弹框
Component({
  properties: {
    isShow: {
      type: Boolean
    },
  },

  data: {

  },

  methods: {
    toCloseModule() {
      this.setData({
        isShow: false
      })
    },

    toConfirm() {
      this.setData({
        isShow: false
      })
      this.triggerEvent('confirmEvent')
    },

    toReject() {
      this.setData({
        isShow: false
      })
      this.triggerEvent('rejectEvent')
    }
  }
})
