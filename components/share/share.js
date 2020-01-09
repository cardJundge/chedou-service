
Component({
  properties: {
    isShow: {
      type: Boolean
    }
  },

  data: {
    bgImg: ''
  },

  ready() {
    wx.getImageInfo({
      src: 'https://6368-chedou-service-1257955119.tcb.qcloud.la/images/login_bg.png?sign=c52ed479650167c1c33ff9f6099cf591&t=1578377227',
      success: res => {
        this.data.bgImg = res.path
        this.paintImg()   
      }
    })
  },

  methods: {
    rpx2px(rpx) {
      const info = wx.getSystemInfoSync()
      return rpx * info.windowWidth / 750
    },

    paintImg() {
      const ctx = wx.createCanvasContext('shareCanvas', this)
      ctx.drawImage(this.data.bgImg, 0, 0, this.rpx2px(476), this.rpx2px(846))

      // 作者名称
      const qrImgSize = this.rpx2px(100)
      const txt = "Hello World"

      ctx.setTextAlign('left')    // 文字居中
      ctx.setFillStyle('#000000')  // 文字颜色：黑色
      ctx.setFontSize(this.rpx2px(30))         // 文字字号
      console.log(ctx.measureText(txt).width / 2 + this.rpx2px(24))
      ctx.fillText(txt, this.rpx2px(24), (qrImgSize + this.rpx2px(48)))

      // 用户头像
      ctx.drawImage('/images/avatar/2.png', (ctx.measureText(txt).width / 2 + this.rpx2px(24) - (qrImgSize / 2)), this.rpx2px(24), qrImgSize, qrImgSize)
      ctx.stroke()

      // 小程序码
      ctx.setFillStyle('#FF0000')
      ctx.fillRect(this.rpx2px(48), this.rpx2px(240), 150, 70)
      ctx.moveTo(0, 0)
      ctx.lineTo(this.rpx2px(476), this.rpx2px(846))
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
