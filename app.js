App({
  onLaunch: function () {
    //  获取页面高度和宽度
    wx.getSystemInfo({
      success: (res) => {
        let {
          windowHeight,
          windowWidth
        } = res;
        this.globalData.windowInfo = {
          windowHeight,
          windowWidth
        }
      }
    })
    //  未登录时直接跳转至欢迎页
    if(!this.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/welcome/welcome',
      })
    }
  },
  globalData: {
    userInfo: null,
    windowInfo: null,
    token: ''
  }
})