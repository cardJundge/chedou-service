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

    }
  }
})
