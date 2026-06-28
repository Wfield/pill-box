Component({
  properties: {
    med: { type: Object, value: {} },
  },
  data: {
    animating: false,
    done: false,
    confetti: [],
  },
  methods: {
    handleTake() {
      if (this.data.animating) return
      const colors = ['#22C57E', '#22C57E', '#F472B6', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA']
      const pieces = Array.from({ length: 28 }, (_, i) => ({
        id: i,
        color: colors[i % colors.length],
        left: Math.random() * 100,
        delay: Math.random() * 0.2 + 's',
      }))
      this.setData({ animating: true, confetti: pieces })
      setTimeout(() => {
        this.setData({ done: true })
        setTimeout(() => {
          this.triggerEvent('take')
          this.setData({ animating: false, done: false, confetti: [] })
        }, 900)
      }, 350)
    },
  },
})
