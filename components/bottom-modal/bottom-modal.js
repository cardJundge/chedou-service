// 底部操作模态框
Component({
  properties: {
    isShow: {
      type: Boolean
    }
  },
  data: {

  },
  methods: {
    // 二维码生成
    

    closeModal() {
      this.setData({
        isShow: false
      })
    }
  }
})
