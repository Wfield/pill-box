const app = getApp()

Page({
  data: {
    medications: [],
  },

  onLoad() {
    this.loadMeds()
  },

  onShow() {
    this.loadMeds()
  },

  loadMeds() {
    const elders = app.globalData.elders
    if (elders.length > 0) {
      this.setData({ medications: elders[0].medications || [] })
    }
  },

  goToPhotoAdd() {
    wx.navigateTo({ url: '/pages/elderly/photo-add/photo-add' })
  },

  goBack() {
    wx.navigateBack()
  },

  goToBp() {
    const app = getApp()
    app.globalData.elderlyTab = 'bp'
    wx.navigateBack()
  },
})
