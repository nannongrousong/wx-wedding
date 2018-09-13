Component({
  properties: {
    hidden: {
      type: Boolean,
      value: true
    }
  },

  data: {
    inputVal: '15651668987',
    showConfirm: false
  },
  methods: {
    bindCancel: function() {
      this.setData({
        showConfirm: true
      })
    },
    bindOK: function() {
      let phone = parseInt(this.data.inputVal * 1);
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        return;
      }

      this.triggerEvent('sendaward', {
        phone
      })

      /*
      this.setData({
        inputVal: ''
      }, () => {
        this.triggerEvent('sendaward', {
          phone
        })
      })
      */
    },
    bindCancel2: function() {
      this.setData({
        showConfirm: false
      }, () => {
        this.triggerEvent('abandonaward');
      })
    },
    bindOK2: function() {
      this.setData({
        showConfirm: false
      })
    },
    bindPhoneInput: function(e, b, c) {
      console.log(e);
      this.setData({
        inputVal: e.detail.value
      })
    }
  }
})