Page({
  data: {},

  onLoad() {
    const app = getApp()
    app.globalData.role = null
  },

  goToElderly() {
    const app = getApp()
    app.globalData.role = 'elderly'
    wx.switchTab({
      url: '/pages/elderly/home/home',
      fail: () => {
        wx.reLaunch({ url: '/pages/elderly/home/home' })
      },
    })
  },

  goToChild() {
    const app = getApp()
    app.globalData.role = 'child'
    wx.reLaunch({
      url: '/pages/child/overview/overview',
    })
  },
})
