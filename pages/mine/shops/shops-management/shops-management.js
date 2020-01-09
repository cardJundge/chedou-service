// 商铺管理
var app = getApp()
Page({

  data: {
    imageList: []
  },

  onLoad: function (options) {

  },

  // 上传店铺照片
  uploadImg() {
    wx.chooseImage({
      count: 9,
      // 可以指定是原图还是压缩图
      sizeType: ['compressed'],
      // 可以指定来源是相册还是相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.hostName + '/api/auth/upload',
            filePath: res.tempFilePaths[i],
            name: 'file',
            success: (res) => {
              
              let data = JSON.parse(res.data)
              if (data.status == 1) {
                imageList.push(data.data.filename)
              } else {
                wx.showToast({
                  title: data.msg ? data.msg : '操作超时',
                  icon: 'none'
                })
              }
            },
            fail: (err) => {
            }
          })
        }
      }
    })
   
  },

  formSubmit() {

  }
})