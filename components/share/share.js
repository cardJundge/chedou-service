
Component({
  properties: {
    isShow: {
      type: Boolean
    },
    data: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        this.getImgObj()
      }
    }
  },

  data: {
    bgImg: ''
  },

  methods: {
    getImgObj() {
      wx.getImageInfo({
        src: 'https://6f6d-omo-service-b6dza-1301029807.tcb.qcloud.la/images/share.png?sign=87067c912367d0468a9923c396c79e96&t=1578647518',
        success: res => {
          this.data.bgImg = res.path
          console.log('测试一下', this.data.bgImg, this.data.isShow)
          this.paintImg()
        }
      })
    },

    toCloseModule() {
      this.setData({
        isShow: false
      })
    },

    rpx2px(rpx) {
      const info = wx.getSystemInfoSync()
      return rpx * info.windowWidth / 750
    },

    paintImg() {
      const ctx = wx.createCanvasContext('shareCanvas', this)
      ctx.drawImage(this.data.bgImg, 0, 0, this.rpx2px(476), this.rpx2px(846))

      // 作者名称
      const logoImgSize = this.rpx2px(64)
      const qrImgSize = this.rpx2px(120)
      const txt = "Hello World"

      ctx.setTextAlign('left')    // 文字居中
      ctx.setFillStyle('#1a65ff')   // 文字颜色：黑色
      ctx.setFontSize(this.rpx2px(24))  // 文字字号
      ctx.fillText(txt, this.rpx2px(24), (logoImgSize + this.rpx2px(54)))

      // 用户头像
      // ctx.drawImage('/images/logo.png', (ctx.measureText(txt).width / 2 + this.rpx2px(24) - (logoImgSize / 2)), this.rpx2px(24), logoImgSize, logoImgSize)
      ctx.drawImage('/images/logo.png', this.rpx2px(24), this.rpx2px(24), logoImgSize, logoImgSize)
      ctx.stroke()

      // 小程序码
      ctx.drawImage('/images/qr_code.png', (this.rpx2px(476) / 2) - (qrImgSize / 2), this.rpx2px(620), qrImgSize, qrImgSize)
      ctx.stroke()
      ctx.draw()
    },

    toSaveImg() {
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        success: res => {
          console.log(res)
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: res => {
              wx.showToast({
                title: '已保存到相册'
              })
            }
          })
        },
        fail: err=> {
          console.log(err)
        }
      },this)
    }
  }
})
