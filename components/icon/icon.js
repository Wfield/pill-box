const { buildIconSrc } = require('../../utils/icons')

Component({
  properties: {
    name: { type: String, value: '' },
    size: { type: Number, value: 48 },
    color: { type: String, value: 'currentColor' },
    stroke: { type: Number, value: 1.8 },
  },
  data: {
    src: '',
  },
  observers: {
    'name, color, stroke': function updateIcon() {
      this.refreshSrc()
    },
  },
  lifetimes: {
    attached() {
      this.refreshSrc()
    },
  },
  methods: {
    refreshSrc() {
      const { name, color, stroke } = this.properties
      this.setData({
        src: buildIconSrc(name, color === 'currentColor' ? '#57534E' : color, stroke),
      })
    },
  },
})
