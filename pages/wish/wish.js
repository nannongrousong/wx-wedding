const app = getApp()
const apiUrl = require('../../config/global.js').getApiUrl();

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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showAuthModal: false,
    barrageMode: false,
    barrageList: [],
    barragepresentTop: 60,
    barrageInitLeft: 0
  },
  bindNavLottery: function() {
    wx.navigateTo({
      url: '../lottery/lottery',
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
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/welcome/welcome'
      })
      return;
    }    
  }, 
  onLoad: function(options) {
    console.log('options', options)
    let testBarrageList = [{
      barrageID: 1,
      text: '弹幕1222222',
      bgColor: getBgColor(),
      top: getBestTop(this.data.barragepresentTop),
      left: 150,
      portraitUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eooia3JcQ34x1oKpWPNkF5vX6MrS2BLhlX98tpibOlOVrekKrTO6FIHIVZiaoJaW8IhtWREcEduWgB6g/132'
    }];
    //  设置弹幕初始left
    this.setData({
      barrageInitLeft: app.globalData.windowInfo.windowWidth,
      barrageList: testBarrageList
    })
  }
})