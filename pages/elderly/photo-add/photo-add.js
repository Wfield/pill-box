Page({
  data: {
    step: 1,
    recognizedName: '',
    chosenTimes: [],
    allTimes: ['08:00', '12:00', '18:00', '20:00', '22:00'],
  },

  onLoad() {
    this.setData({ step: 1, recognizedName: '', chosenTimes: [] })
  },

  takePhoto() {
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      success() {
        that.setData({
          recognizedName: '苯磺酸氨氯地平片',
          step: 2,
        })
      },
      fail() {
        wx.showToast({ title: '拍照已取消', icon: 'none' })
      },
    })
  },

  simulatePhoto() {
    this.setData({
      recognizedName: '苯磺酸氨氯地平片',
      step: 2,
    })
  },

  goToStep3() {
    this.setData({ step: 3 })
  },

  goToStep4() {
    if (this.data.chosenTimes.length === 0) return
    this.setData({ step: 4 })
  },

  toggleTime(e) {
    const t = e.currentTarget.dataset.time
    const times = this.data.chosenTimes
    if (times.includes(t)) {
      this.setData({ chosenTimes: times.filter(x => x !== t) })
    } else {
      this.setData({ chosenTimes: [...times, t] })
    }
  },

  goBack() {
    const step = this.data.step
    if (step > 1) {
      this.setData({ step: step - 1 })
    } else {
      wx.navigateBack()
    }
  },

  goToStep(e) {
    this.setData({ step: parseInt(e.currentTarget.dataset.step) })
  },

  finish() {
    wx.showToast({ title: '已发送给子女确认', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  sendToChild() {
    this.setData({ step: 4 })
  },
})
