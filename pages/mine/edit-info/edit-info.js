// 修改基本信息
Page({
  data: {

  },
  onLoad: function (options) {

  },
  uploadAvatar() {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://service.com/api/auth/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            console.log(res)
          }
        })
      }
    })
  }
})