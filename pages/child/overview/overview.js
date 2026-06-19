const app = getApp()

const MED_ALERTS = [
  { id: 'alert1', elderName: '妈妈', time: '08:00', medName: '苯磺酸氨氯地平片', minutesAgo: 45 },
]

Page({
  data: {
    elders: [],
    medAlerts: MED_ALERTS,
    showMedAlert: false,
    showFullAttendance: false,
    congratsNames: '',
    likeSent: false,
    alertDismissed: false,
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const elders = app.globalData.elders || []
    const allDoneEld = elders.filter(e => e.today.allDone)
    const hasMedAlerts = MED_ALERTS.length > 0 && !this.data.alertDismissed
    const showMedAlert = hasMedAlerts && !this.data.likeSent
    const showFullAttendance = allDoneEld.length > 0 && !this.data.likeSent && !hasMedAlerts
    const congratsNames = allDoneEld.map(e => e.name.split('（')[0]).join('、')

    this.setData({
      elders,
      showMedAlert,
      showFullAttendance,
      congratsNames,
    })
  },

  goToElderDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/child/elder-detail/elder-detail?elderId=${id}`,
    })
  },

  goToBindFlow() {
    wx.navigateTo({ url: '/pages/child/bind-flow/bind-flow' })
  },

  dismissAlert() {
    this.setData({ alertDismissed: true }, () => this.loadData())
  },

  sendLike() {
    this.setData({ likeSent: true }, () => this.loadData())
    wx.showToast({ title: '已发送鼓励', icon: 'success' })
  },

  sendReminder() {
    wx.showToast({ title: '已向老人端发送服药提醒', icon: 'success' })
  },
})
