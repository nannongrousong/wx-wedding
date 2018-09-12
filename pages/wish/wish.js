const app = getApp()

//  弹幕背景颜色随机
const getBgColor = () => {
  let bgColors = ['red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'purple'];
  return bgColors[parseInt(Math.random() * 7)];
}

//  获取弹幕的最终高度
const getBestTop = (top) => {
  let clientHeight = app.globalData.windowInfo.windowHeight - 100;
  return top % clientHeight;
}

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showAuthModal: false,
    barrageMode: false,
    barrageList: [],
    barragepresentTop: 60,
    barrageInitLeft: 0
  },
  bindSetting: function(a, b, c) {},
  bindNavLottery: function() {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  bindNavSign: function() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {

      },
      fail: (res) => {
        this.setData({
          showAuthModal: true
        })
      }
    })
  },
  bindNavWish: function() {
    this.bindSwitchArea()
  },
  bindNavMap: function() {
    wx.navigateTo({
      url: '../map/map',
    })
  },
  bindSwitchArea: function() {
    this.setData({
      barrageMode: !this.data.barrageMode
    })
  },
  bindBarrageEnd: function(e) {
    const {
      barrageID
    } = e.detail;
    console.log('bindBarrageEnd.barrageID', barrageID)
  },
  bindSendBarrage: function() {
    console.log('wish.bindSendBarrage')
  },
  onLoad: function() {
    setTimeout(() => {
      wx.showToast({
        image: '/image/app.jpg',
        title: 'xxxxxxxxx',
      })
    }, 3000)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    let testBarrageList = [{
      barrageID: 1,
      text: '弹幕1222222',
      bgColor: getBgColor(),
      top: getBestTop(this.data.barragepresentTop),
      left: 150,
      portraitUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eooia3JcQ34x1oKpWPNkF5vX6MrS2BLhlX98tpibOlOVrekKrTO6FIHIVZiaoJaW8IhtWREcEduWgB6g/132'
    }];
    console.log('testBarrageList', testBarrageList)
    //  设置弹幕初始left
    this.setData({
      barrageInitLeft: app.globalData.windowInfo.windowWidth,
      barrageList: testBarrageList
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})