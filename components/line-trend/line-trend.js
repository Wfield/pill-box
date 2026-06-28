Component({
  properties: {
    data: { type: Array, value: [] },
    lines: { type: Array, value: [] },
    height: { type: Number, value: 200 },
    warnLines: { type: Array, value: [] },
    yMinForce: { type: Number, value: undefined },
    yMaxForce: { type: Number, value: undefined },
  },
  observers: {
    'data, lines, warnLines': function () {
      this.drawChart()
    },
  },
  data: {
    canvasWidth: 600,
    canvasHeight: 200,
    rendered: false,
  },
  lifetimes: {
    attached() {
      const sysInfo = wx.getSystemInfoSync()
      const width = sysInfo.windowWidth - 60
      this.setData({
        canvasWidth: width * 2 || 600,
        canvasHeight: 200,
      })
    },
    ready() {
      this.drawChart()
    },
  },
  methods: {
    drawChart() {
      const { data, lines, warnLines, height, yMinForce, yMaxForce } = this.properties
      if (!data || data.length === 0 || !lines || lines.length === 0) return

      const ctx = wx.createCanvasContext('lineTrendCanvas', this)
      const W = this.data.canvasWidth
      const H = height * 2 || 200
      const L = 80
      const R = 40
      const pad = 60

      const allValues = data.flatMap(d => lines.map(l => d[l.key]))
      const wAll = warnLines.map(w => w.value)
      let max = Math.max(...allValues, ...wAll)
      let min = Math.min(...allValues, ...wAll)
      if (yMaxForce !== undefined) max = Math.max(max, yMaxForce)
      if (yMinForce !== undefined) min = Math.min(min, yMinForce)
      const range = (max - min) || 1
      const padVal = range * 0.2

      const x = (i) => data.length <= 1 ? (W) / 2 : (i / (data.length - 1)) * (W - L - R) + L
      const y = (v) => H - pad - ((v - min + padVal) / (range + padVal * 2)) * (H - pad * 2)

      ctx.clearRect(0, 0, W, H)

      warnLines.forEach((w) => {
        const wy = y(w.value)
        ctx.setStrokeStyle(w.color)
        ctx.setLineWidth(1)
        ctx.setLineDash([8, 6])
        ctx.beginPath()
        ctx.moveTo(L, wy)
        ctx.lineTo(W - R, wy)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.setFontSize(18)
        ctx.setFillStyle(w.color)
        ctx.setTextAlign('right')
        ctx.fillText(String(w.value), L - 8, wy + 6)
        if (w.label) {
          ctx.setTextAlign('end')
          ctx.fillText(w.label, W - R, wy - 8)
        }
      })

      lines.forEach((l, li) => {
        ctx.setStrokeStyle(l.color)
        ctx.setLineWidth(4)
        ctx.setLineDash([])
        ctx.beginPath()
        data.forEach((d, i) => {
          const px = x(i)
          const py = y(d[l.key])
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        })
        ctx.stroke()

        data.forEach((d, i) => {
          const px = x(i)
          const py = y(d[l.key])
          const isAbnormal = l.abnormalCheck ? l.abnormalCheck(d[l.key]) : false
          ctx.beginPath()
          ctx.arc(px, py, isAbnormal ? 7 : 5, 0, 2 * Math.PI)
          ctx.setFillStyle(isAbnormal ? '#DC3545' : l.color)
          ctx.fill()
        })
      })

      data.forEach((d, i) => {
        const px = x(i)
        ctx.setFontSize(18)
        ctx.setFillStyle('#7D848C')
        ctx.setTextAlign('center')
        ctx.fillText(d.label, px, H - 12)
      })

      ctx.draw(false, () => {
        this.setData({ rendered: true })
      })
    },
  },
})
