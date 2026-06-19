Component({
  properties: {
    med: { type: Object, value: {} },
  },
  data: {
    madeUp: false,
  },
  methods: {
    handleMakeUp() {
      this.setData({ madeUp: true })
      setTimeout(() => {
        this.triggerEvent('makeup')
        this.setData({ madeUp: false })
      }, 800)
    },
  },
})
