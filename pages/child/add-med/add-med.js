Page({
  data: {
    medName: '',
    dose: '',
    doseUnit: '片',
    packageCount: '',
    times: ['08:00'],
    note: '',
    doseUnits: ['片', '粒', 'ml'],
    allTimes: ['08:00', '12:00', '18:00', '20:00', '22:00'],
  },

  onNameInput(e) { this.setData({ medName: e.detail.value }) },
  onDoseInput(e) { this.setData({ dose: e.detail.value }) },
  onPackageInput(e) { this.setData({ packageCount: e.detail.value }) },
  onNoteInput(e) { this.setData({ note: e.detail.value }) },

  onDoseUnitChange(e) {
    const idx = e.detail.value
    this.setData({ doseUnit: this.data.doseUnits[idx] })
  },

  addTime() {
    const that = this
    wx.showActionSheet({
      itemList: this.data.allTimes.map(t => t + (this.data.times.includes(t) ? ' (已选)' : '')),
      success(res) {
        const t = that.data.allTimes[res.tapIndex]
        if (!that.data.times.includes(t)) {
          that.setData({ times: [...that.data.times, t].sort() })
        }
      },
    })
  },

  removeTime(e) {
    const t = e.currentTarget.dataset.time
    this.setData({ times: this.data.times.filter(x => x !== t) })
  },

  takePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success() {
        wx.showToast({ title: '识别成功', icon: 'success' })
      },
    })
  },

  save() {
    if (!this.data.medName) {
      wx.showToast({ title: '请填写药品名称', icon: 'none' })
      return
    }
    wx.showToast({ title: '药品已添加', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 1000)
  },

  cancel() {
    wx.navigateBack()
  },
})
