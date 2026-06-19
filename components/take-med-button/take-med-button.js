Component({
  properties: {
    large: { type: Boolean, value: false },
  },
  data: {
    animating: false,
    done: false,
  },
  methods: {
    handleTake() {
      if (this.data.animating) return
      this.setData({ animating: true })
      setTimeout(() => {
        this.setData({ done: true })
        setTimeout(() => {
          this.triggerEvent('take')
          this.setData({ animating: false, done: false })
        }, 800)
      }, 100)
    },
  },
})
