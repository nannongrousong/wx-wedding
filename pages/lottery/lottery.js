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
    console.log('startLottery')
    this.setData({
      awardStyle: ''
    }, () => {
      wx.request({
        url: '/award/record',
        data: '',
        method: 'GET',
        success: (res) => {
          const {
            data: resData,
            statusCode
          } = res;
          if (!resData.Code) {
            wx.showModal({
              content: resData.info,
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
    let awardList = [{
        "award_id": 2,
        "name": "2元红包",
        "type": "local",
        "icon": "gift"
      }, {
        name: '谢谢参与',
        icon: 'smile-o'
      },
      {
        "award_id": 4,
        "name": "4元红包",
        "type": "local",
        "icon": "gift"
      }, {
        name: '谢谢参与',
        icon: 'smile-o'
      }
    ];

    const count = awardList.length;
    awardList.map((award, index) => {
      award.lineDeg = -360 / count / 2 + (360 / count) * (index - 1);
      award.awardDeg = -360 / count * index;
    });

    this.setData({
      awardList
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