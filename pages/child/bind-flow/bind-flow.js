Page({
  data: {
    step: 0,
    phone: '138',
    nickname: '',
  },

  onLoad() {
    this.setData({ step: 0, phone: '138', nickname: '' })
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value })
  },

  onNicknameInput(e) {
    this.setData({ nickname: e.detail.value })
  },

  sendInvite() {
    this.setData({ step: 1 })
  },

  simulateConfirm() {
    this.setData({ step: 2 })
  },

  finish() {
    wx.navigateBack()
  },

  goBack() {
    if (this.data.step > 0) {
      this.setData({ step: this.data.step - 1 })
    } else {
      wx.navigateBack()
    }
  },
})
