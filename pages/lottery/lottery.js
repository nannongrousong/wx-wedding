const apiUrl = require('../../config/global.js').getApiUrl();
const app = getApp()

Page({
  data: {
    awardList: [],
    awardStyle: '',
    showAwardModal: false,
    showAuthModal: false
  },
  bindBackhome: () => {
    wx.navigateTo({
      url: '../wish/wish',
    })
  },
  bindAbandonAward: function () {
    this.setData({
      showAwardModal: false
    })
  },
  bindSendAward: function (e) {
    const { phone } = e.detail;
    console.log('bindSendAward.reamrk', phone)
  },
  bindEndCircle: function() {
    let awardStr = wx.getStorageInfoSync('award');
    wx.removeStorageSync('award')

    let awardName = '', recordID = '';
    if (awardStr != undefined) {
      let awardInfo = JSON.parse(awardStr)
      recordID = awardInfo.recordID;
      awardName = awardInfo.name;
    }

    if (recordID != undefined && recordID != '') {
      
    }
  },
  startLottery: function() {
    let token = wx.getStorageSync('TOKEN');
    if(!token) {
      this.setData({
        showAuthModal: true
      })
      return;
    }
    this.setData({
      awardStyle: ''
    }, () => {
      wx.request({
        url: apiUrl.LIST_AWARD_RECORD,
        data: {
          token: app.globalData.token
        },
        success: (res) => {
          const {
            data: resData,
            statusCode
          } = res;
          if (!resData.code) {
            wx.showModal({
              content: resData.info || '',
              showCancel: false
            })
            return;
          }

          if (resData.data.canLottery) {
            wx.showModal({
              content: '今天的抽奖次数用完啦，请明天再来吧！',
              showCancel: false
            })
          } else {
            wx.request({
              url: '/award/lottery',
              success: (res) => {
                const {
                  data: resData
                } = res;
                if (!resData.Code) {
                  wx.showModal({
                    content: resData.info,
                    showCancel: false
                  })
                  return;
                }
                console.log('我要转转：' + resData.data.deg);
                wx.setStorageSync('award', JSON.stringify(resData.data.award))

                const lastDeg = 360 * 10 + resData.data.deg;
                this.setData({
                  awardStyle: `transform: rotate(${lastDeg}deg);transition:transform 10s ease`
                })
              }
            })
          }
        }
      })
    })
  },
  onLoad: function(options) {
    wx.request({
      url: apiUrl.LIST_AWARD,
      success: (res) => {
        const {
          data: resData
        } = res;

        if(!resData.code) {
          wx.showModal({
            title: '信息',
            content: resData.info,
          })
          return;
        }

        let lastShowAwards = [];
        resData.data.forEach((award) => {
          lastShowAwards.push({
            name: award.name,
            icon: award.icon
          })

          lastShowAwards.push({
            name: '谢谢参与',
            icon: 'smile-o'
          })
        })

        const count = lastShowAwards.length;
        lastShowAwards.map((award, index) => {
          award.lineDeg = -360 / count / 2 + (360 / count) * (index - 1);
          award.awardDeg = -360 / count * index;
        });

        this.setData({
          awardList: lastShowAwards
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})