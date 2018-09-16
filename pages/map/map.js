const apiUrl = require('../../config/global.js').getApiUrl();
const utils = require('../../utils/util.js');
Page({
  data: {
    latitude: 32.0721630000,
    longitude: 118.7988230000,
    markers: null
  },
  bindBackhome: () => {
    wx.navigateTo({
      url: '../wish/wish',
    })
  },
  onLoad: function(options) {
    wx.request({
      url: apiUrl.GET_POSITION_INFO,
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

        let { latitude, longitude, remark} = JSON.parse(resData.data);
        this.setData({
          latitude,
          longitude,
          markers: [{
            iconPath: "/image/map-tag.png",
            id: 0,
            latitude,
            longitude,
            width: 40,
            height: 60,
            callout: {
              content: remark,
              color: '#F44336',
              display: 'ALWAYS',
              borderRadius: 5,
              padding: 15
            }
          }]
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