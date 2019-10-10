// 添加模块
Component({
  properties: {
    isShow: {
      type: Boolean
    }
  },
  data: {
    isSelect: true
  },
  methods: {
    onConfirm() {
      this.setData({
        isShow: false
      })
    }
  }
})
