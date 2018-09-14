const apiUrl = require('../../config/global.js').getApiUrl();
const app = getApp()
const utils = require('../../utils/util.js');

Page({
  data: {
    awardList: [],
    awardStyle: '',
    showAwardModal: false
  },
  bindBackhome: () => {
    wx.navigateTo({
      url: '../wish/wish',
    })
  },
  bindAbandonAward: function() {
    this.setData({
      showAwardModal: false
    })
  },
  bindSendAward: function(e) {
    const {
      phone
    } = e.detail;
    wx.request({
      url: apiUrl.AWARD_MARK,
      method: 'POST',
      data: {
        token: app.globalData.token,
        phone,
        recordID: this.recordID //记得清空
      },
      success: (res) => {
        let {
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

        this.recordID = '';

        wx.showModal({
          content: '提交成功！预计三天日完成奖品发放！',
          showCancel: false,
          success: (res) => {
            this.setData({
              showAwardModal: false
            })
          }
        })
      },
      fail: (res) => {
        utils.justShowInfo(res.errMsg)
      }
    })
  },
  bindEndCircle: function() {
    let awardInfo = wx.getStorageSync('awardInfo');
    wx.removeStorageSync('awardInfo')

    let awardName = '',
      recordID = '';
    if (awardInfo) {
      recordID = awardInfo.recordID;
      awardName = awardInfo.name;
    }

    if (recordID) {
      this.recordID = recordID;
      this.setData({
        showAwardModal: true
      })
    } else {
      utils.justShowInfo('好可惜，再试试吧')
    }

  },
  startLottery: function() {
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/welcome/welcome?from=lottery'
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

          if (statusCode != 200) {
            utils.justShowInfo(res.data)
            return;
          }

          if (!resData.code) {
            utils.justShowInfo(resData.info || '')
            return;
          }

          if (!resData.data.canLottery) {
            utils.justShowInfo('今天的抽奖次数用完啦，请明天再来吧！')
          } else {
            wx.request({
              url: apiUrl.AWARD_LOTTERY,
              data: {
                token: app.globalData.token
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
                console.log('我要转转：' + resData.data.deg);
                wx.setStorageSync('awardInfo', resData.data.award)

                const lastDeg = 360 * 10 + resData.data.deg;
                this.setData({
                  awardStyle: `transform: rotate(${lastDeg}deg);transition:transform 10s ease`
                })
              },
              fail: (res) => {
                utils.justShowInfo(res.errMsg)
              }
            })
          }
        },
        fail: (res) => {
          utils.justShowInfo(res.errMsg)
        }
      })
    })
  },
  onLoad: function(options) {
    wx.request({
      url: apiUrl.LIST_AWARD,
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
          utils.justShowInfo(res.info || '')
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
      },
      fail: (res) => {
        utils.justShowInfo(res.errMsg)
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