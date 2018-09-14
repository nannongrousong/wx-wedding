const app = getApp()
const apiUrl = require('../../config/global.js').getApiUrl();
const utils = require('../../utils/util.js')

//  弹幕背景颜色随机
const getBarrageColor = () => {
  let colorMap = [
    ['#336699', '#FFFFFF'],
    ['#66CCCC', '#FFFFFF'],
    ['#00B271', '#FFFFFF'],
    ['#479AC7', '#FFFFFF'],
    ['#F0DAD2', '#343434'],
    ['#EFEFDA', '#E6421A'],
    ['#B45B3E', '#FFFFFF']
  ]
  return colorMap[parseInt(Math.random() * 7)];
}

//  获取弹幕的最终高度
const getBestTop = (top) => {
  let clientHeight = app.globalData.windowInfo.windowHeight - 30;
  return top % clientHeight;
}

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    barrageInput: '',
    showAuthModal: false,
    barrageMode: false,
    barrageList: []
  },
  bindBarrageInput: function() {
    this.setData({
      barrageInput: e.detail.value
    })
  },
  bindNavLottery: function () {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  bindNavWish: function () {
    this.bindSwitchArea()
  },
  bindNavMap: function () {
    wx.navigateTo({
      url: '../map/map',
    })
  },
  bindSwitchArea: function () {
    this.setData({
      barrageMode: !this.data.barrageMode
    })
  },
  bindBarrageEnd: function (e) {
    const {
      barrageID
    } = e.detail;

    let { barrageList } = this.data;
    let newBarrageList = barrageList.filter((barrage) => {
      return barrage.barrageID != barrageID;
    })
    this.setData({ barrageList: newBarrageList })
  },
  bindSendBarrage: function () {
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/welcome/welcome'
      })
      return;
    }
    wx.request({
      url: apiUrl.ADD_BARRAGE,
      method: 'POST',
      data: {
        token: app.globalData.token,
        text: this.data.barrageInput
      },
      success: (res) => {
        const {
          data: resData,
          statusCode
        } = res;

        if (statusCode != 200) {
          utils.justShowInfo(res.data)
          return;
        }

        if(!resData.code) {
          utils.justShowInfo(resData.info || '')
        }
      },
      fail: (res) => {
        utils.justShowInfo(res.errMsg)
      }
    })
  },
  onShow: function () {
    if (app.globalData.userInfo) {
      this.loadBarrageList();
      this.scheduleID = setInterval(() => {
        this.loadBarrageList()
      }, 5000)
    }
  },
  loadBarrageList: function() {
    let lastST = wx.getStorageSync('lastST');
    wx.request({
      url: apiUrl.LIST_BARRAGE,
      data: {
        lastST
      },
      success: (res) => {
        const {
          data: resData,
          statusCode
        } = res;

        if (statusCode != 200) {
          utils.justShowInfo(res.data)
          return;
        }

        if (!resData.code) {
          utils.justShowInfo(resData.info || '')
          return;
        }

        let barrageList = resData.data;
        let showBarrageList = [];

        barrageList.forEach((barrage) => {
          const {
            barrage_id,
            portrait_url,
            text
          } = barrage;
          showBarrageList.push({
            barrageID: barrage_id,
            text,
            bgColor: getBarrageColor()[0],
            textColor: getBarrageColor()[1],
            top: getBestTop(this.barragepresentTop),
            left: app.globalData.windowInfo.windowWidth,
            portraitUrl: portrait_url
          })
          this.barragepresentTop += 40
        })

        this.setData({
          barrageList: showBarrageList
        }, () => {
          //  记录下最后一个弹幕时间，以供下次查询携带参数
          if (barrageList.length > 0) {
            wx.setStorage({
              key: 'lastST',
              data: barrageList[barrageList.length - 1].send_time,
            })
          }
        })
      },
      fail: (res) => {
        utils.justShowInfo(res.errMsg)
      }
    })
  },
  onLoad: function (options) {
    wx.setStorageSync('appFrom', options.from || '')

    //  未登录时直接跳转至欢迎页
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/welcome/welcome',
      })
      return;
    }
  },
  onHide: function() {
    clearInterval(this.scheduleID);
  },
  barragepresentTop: 20
})