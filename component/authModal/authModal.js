// component/myModal/myModal.js
Component({
  properties: {
    hidden: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  methods: {
    bindCancel: function() {
      this.setData({
        hidden: true
      })
    },
    bindGetUserInfo: function(res) {
      

      debugger;

      let settingRes = true;
      const {
        authSetting
      } = res.detail;

      for (let key in authSetting) {
        settingRes = settingRes && authSetting[key];
      }

      if (settingRes) {
        this.setData({
          hidden: true
        })


      } else {
        wx.showModal({
          content: '您取消授权后，就不能抽奖啦',
          showCancel: false
        })
      }
    }
  }
})