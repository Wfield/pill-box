const mockData = require('../../../utils/mock-data')

Page({
  data: {
    currentTab: 'home',
    streak: 23,
    encouragement: { from: '女儿小丽', text: '妈妈辛苦了！', time: '21:08' },
    encouragementSeen: false,
    medications: [
      { id: 1, name: '苯磺酸氨氯地平片', dose: '1片', time: '08:00', status: 'missed', note: '餐后服用' },
      { id: 2, name: '二甲双胍缓释片', dose: '1片', time: '12:00', status: 'pending', note: '随餐服用' },
      { id: 3, name: '阿托伐他汀钙片', dose: '1片', time: '20:00', status: 'pending', note: '睡前服用' },
    ],
    // Blood Pressure
    bpPeriod: 'week',
    bpPeriods: [
      { key: 'day', label: '天' },
      { key: 'week', label: '周' },
      { key: 'month', label: '月' },
      { key: 'year', label: '年' },
    ],
    bpPeriodOffset: 0,
    bpData: [],
    bpRecordStep: 0,
    bpRecordValues: { sys: '', dia: '', hr: '' },
    bpRecords: [
      { date: '06-08 08:30', sys: 138, dia: 85, hr: 72 },
      { date: '06-07 08:15', sys: 142, dia: 88, hr: 75 },
      { date: '06-06 08:45', sys: 135, dia: 82, hr: 70 },
    ],
    nextMed: null,
    pendingMeds: [],
    takenMeds: [],
    missedMeds: [],
    periodLabel: '',
    bpLines: [],
    bpWarnLines: [],
    hrLines: [],
    hrWarnLines: [],
  },

  onLoad() {
    this.refreshBPData()
    this.refreshDerivedData()
  },

  onShow() {
    const app = getApp()
    if (app.globalData.elderlyTab) {
      this.setData({ currentTab: app.globalData.elderlyTab })
      app.globalData.elderlyTab = null
      if (this.data.currentTab === 'bp') {
        this.refreshBPData()
      } else {
        this.refreshDerivedData()
      }
    }
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
    if (tab === 'bp') {
      this.refreshBPData()
    } else {
      this.refreshDerivedData()
    }
  },

  dismissEncouragement() {
    this.setData({ encouragementSeen: true })
  },

  handleTakeMed(e) {
    const id = e.detail ? e.detail : (e.currentTarget ? e.currentTarget.dataset.id : null)
    if (!id) return
    const meds = this.data.medications.map(m => {
      if (m.id === id) {
        const newStatus = m.status === 'missed' ? 'late' : 'taken'
        return { ...m, status: newStatus }
      }
      return m
    })
    this.setData({ medications: meds }, () => this.refreshDerivedData())
  },

  handleMakeUp(e) {
    const id = e.currentTarget.dataset.id
    this.handleTakeMed({ detail: id })
  },

  refreshDerivedData() {
    const meds = this.data.medications
    const nextMed = meds.find(m => m.status === 'pending') || null
    const pendingMeds = meds.filter(m => m.status === 'pending')
    const takenMeds = meds.filter(m => m.status === 'taken' || m.status === 'late')
    const missedMeds = meds.filter(m => m.status === 'missed')
    this.setData({ nextMed, pendingMeds, takenMeds, missedMeds })
  },

  // BP period switching
  switchBpPeriod(e) {
    const period = e.currentTarget.dataset.period
    this.setData({
      bpPeriod: period,
      bpPeriodOffset: 0,
    }, () => {
      this.refreshBPData()
      this.updatePeriodLabel()
    })
  },

  shiftBpPeriod(e) {
    const delta = parseInt(e.currentTarget.dataset.delta)
    const newOffset = Math.max(0, this.data.bpPeriodOffset + delta)
    this.setData({ bpPeriodOffset: newOffset }, () => {
      this.refreshBPData()
      this.updatePeriodLabel()
    })
  },

  refreshBPData() {
    const data = mockData.generateBPData(this.data.bpPeriod, this.data.bpPeriodOffset)
    const maxSys = Math.max(...data.map(d => d.sys), 140)
    const maxDia = Math.max(...data.map(d => d.dia), 90)
    data.forEach(d => {
      d.sysHeight = Math.round((d.sys / maxSys) * 100)
      d.diaHeight = Math.round((d.dia / maxDia) * 100)
    })
    this.updatePeriodLabel()
    this.setData({
      bpData: data,
      bpLines: [
        { key: 'sys', color: '#22C57E', abnormalCheck: v => v >= 140 },
        { key: 'dia', color: '#5B9BD5', abnormalCheck: v => v >= 90 },
      ],
      bpWarnLines: [
        { value: 140, color: '#DC3545', label: '高压警戒' },
        { value: 90, color: '#5B9BD5', label: '低压警戒' },
      ],
      hrLines: [
        { key: 'hr', color: '#5B9BD5', abnormalCheck: v => v < 60 || v > 100 },
      ],
      hrWarnLines: [
        { value: 100, color: '#7D848C', label: '上限' },
        { value: 60, color: '#7D848C', label: '下限' },
      ],
    })
  },

  updatePeriodLabel() {
    this.setData({
      periodLabel: mockData.getPeriodLabel(this.data.bpPeriod, this.data.bpPeriodOffset),
    })
  },

  // BP recording
  startBPRecord() {
    this.setData({
      bpRecordStep: 1,
      bpRecordValues: { sys: '', dia: '', hr: '' },
    })
  },

  bpTakePhoto() {
    this.setData({
      'bpRecordValues.sys': '138',
      'bpRecordValues.dia': '85',
      'bpRecordValues.hr': '72',
    })
  },

  bpRetakePhoto() {
    this.setData({ bpRecordValues: { sys: '', dia: '', hr: '' } })
  },

  onBpInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`bpRecordValues.${field}`]: value,
    })
  },

  saveBPRecord() {
    if (!this.data.bpRecordValues.sys) return
    this.setData({ bpRecordStep: 3 })
  },

  backFromBpRecord() {
    this.setData({ bpRecordStep: 0 })
  },

  goToMeds() {
    wx.navigateTo({ url: '/pages/elderly/meds/meds' })
  },

  goToPhotoAdd() {
    wx.navigateTo({ url: '/pages/elderly/photo-add/photo-add' })
  },

  showReminder() {
    wx.navigateTo({ url: '/pages/elderly/reminder/reminder' })
  },

  goHome() {
    this.setData({ currentTab: 'home' })
  },

  onTouchStart(e) {
    this._touchStartX = e.touches[0].clientX
  },

  onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - (this._touchStartX || 0)
    if (Math.abs(dx) > 50) {
      const delta = dx > 0 ? 1 : -1
      const newOffset = Math.max(0, this.data.bpPeriodOffset + delta)
      this.setData({ bpPeriodOffset: newOffset }, () => this.refreshBPData())
    }
  },
})
