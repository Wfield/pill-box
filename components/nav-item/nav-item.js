Component({
  options: {
    multipleSlots: true,
    virtualHost: true,
  },
  properties: {
    icon: { type: String, value: '' },
    label: { type: String, value: '' },
    active: { type: Boolean, value: false },
    activeColor: { type: String, value: '#22C57E' },
  },
  methods: {
    onClick() {
      this.triggerEvent('tap')
    },
  },
})
