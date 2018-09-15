Component({
  properties: {
    barrageinfo: {
      type: Object,
      value: {}
    },
    removeBarrage: {
      type: Function,
    }
  },
  data: {
    transform: '',
    transition: ''
  },
  methods: {
    onLoad: function() {},
    bindBarrageEnd: function() {
      const {
        barrageID
      } = this.properties.barrageinfo;
      this.triggerEvent('barrageend', {
        barrageID
      });
    }
  },
  ready: function() {
    let {
      showTime,
      left
    } = this.properties.barrageinfo;

    let xEnd = parseInt(left * 1.5 * -1);
    const tempTimeID = setTimeout(() => {
      clearTimeout(tempTimeID);
      this.setData({
        transform: `translateX(${xEnd}px)`,
        transition: `transform ${showTime}s linear`
      })
    }, 10);
  }
})