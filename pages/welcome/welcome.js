const app = getApp()
const apiUrl = require('../../config/global.js').getApiUrl();

Page({
  data: {
    fromUrl: ''
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //  授权成功

      //  登录，插入用户并获取用户openid
      wx.login({
        success: res => {
          let {
            code
          } = res;
          wx.request({
            url: apiUrl.WX_LOGIN,
            method: 'POST',
            data: {
              code,
              nickName: e.detail.userInfo.nickName,
              portraitUrl: e.detail.userInfo.avatarUrl,
              sign: wx.getStorageSync('appFrom')
            },
            success: (res) => {
              let resData = res.data;
              if (resData.code) {
                app.globalData.userInfo = e.detail.userInfo;
                app.globalData.token = resData.data.token;
                let backUrl = '/pages/wish/wish'
                if (this.fromUrl == 'lottery') {
                  backUrl = '/pages/lottery/lottery'
                }
                wx.navigateTo({
                  url: backUrl
                })
              } else {
                wx.showModal({
                  title: '信息',
                  content: resData.info,
                })
              }
            }
          })
        }
      })

    } else {
      wx.navigateTo({
        url: '/pages/wish/wish'
      })
    }

  },
  onLoad: function(options) {
    this.fromUrl = options.from;
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