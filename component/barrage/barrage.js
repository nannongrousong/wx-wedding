// component/barrage/barrage.js
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
    transform: ''
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
    console.log('attached')
    let initLeft = this.properties.barrageinfo.left;
    let xEnd = (initLeft + 400) * -1;
    /*
    const tempTimeID = setTimeout(() => {
      clearTimeout(tempTimeID);
      this.setData({
        transform: `translateX(${xEnd}px)`
      })
    }, 10);
    */
  },
  detached: function() {
    console.log('detached')
  }
})