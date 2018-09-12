Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardList: [],
    awardStyle: ''
  },
  bindBackhome: () => {
    wx.navigateTo({
      url: '../wish/wish',
    })
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
          const { data, statusCode } = res;
          if(!data.Code) {
            wx.showToast({
              title: '今天的抽奖次数用完啦，请明天再来吧！',
            })
            return;
          }

          wx.request({
            url: '/award/lottery',
            success: (res) => {
              const { data } = res;
              if(!data.Code) {
                
              }
            }
          })
        }
      })
    })
    this.setData({
      awardStyle: 'transform: rotate(1000deg);transition: transform 10s ease'
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