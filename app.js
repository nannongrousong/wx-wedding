App({
  onLaunch: function () {
    //  获取页面高度和宽度
    wx.getSystemInfo({
      success: (res) => {
        let {
          windowHeight,
          windowWidth,
          pixelRatio
        } = res;
        this.globalData.windowInfo = {
          windowHeight,
          windowWidth
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    windowInfo: null,
    token: ''
  }
})