const app = getApp()

Page({
  data: {
    nextMed: null,
    currentIndex: 0,
  },

  onLoad() {
    this.loadNextMed()
  },

  loadNextMed() {
    const elders = app.globalData.elders
    if (elders.length > 0) {
      const meds = elders[0].medications || []
      const pending = meds.filter(m => m.status === 'pending')
      this.setData({ nextMed: pending[0] || null })
    }
  },

  handleTake() {
    wx.showToast({ title: '已记录', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 800)
  },

  remindLater() {
    wx.navigateBack()
  },
})
