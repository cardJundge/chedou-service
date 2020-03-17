// 客户印象标签
Component({
  properties: {
    isShow:{
      type: Boolean
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

    // 取消
    onCancel() {

    },

    // 确定
    onConfirm() {

    },

    // 删除标签
    toDelTags() {
      wx.showModal({
        title: '提示',
        content: '确定删除该标签吗？',
        success: res=> {
          if(res.confirm) {
            // 调用删除接口
          } else if (res.cancel) {

          }
        }
      })
    }
  }
})
