const app = getApp()
const util = require('../../../utils/util')
const mockData = require('../../../utils/mock-data')

Page({
  data: {
    elderId: 0,
    elder: null,
    currentTab: 'elderHome',
    // Meds
    medsSubTab: 'calendar',
    parentMeds: [],
    monthOffset: 0,
    medFilter: 'all',
    filterNames: [],
    selectedDay: null,
    editingMed: null,
    // Calendar
    calendarDays: [],
    monthLabel: '',
    isCurrentMonth: false,
    dayTimeline: [],
    monthRate: 0,
    monthMissed: 0,
    monthFullDays: 0,
    // BP
    bpPeriod: 'week',
    bpPeriodOffset: 0,
    bpData: [],
    bpLines: [],
    bpWarnLines: [],
    hrLines: [],
    hrWarnLines: [],
    periodLabel: '',
    recentRecords: [],
    showAddMedModal: false,
    pageTitle: '首页',
    takenCount: 0,
    totalCount: 0,
    progressWidth: 0,
    medFilterIdx: 0,
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    periodKeys: ['day', 'week', 'month', 'year'],
  },

  onLoad(options) {
    const elderId = parseInt(options.elderId) || 0
    this.setData({ elderId }, () => {
      this.loadElderData()
    })
  },

  loadElderData() {
    const elders = app.globalData.elders || []
    const elder = elders[this.data.elderId]
    if (!elder) return
    const meds = elder.medications || []
    const filterNames = ['全部药品', ...meds.map(m => m.name)]
    this.setData({
      elder,
      parentMeds: meds,
      filterNames,
    }, () => {
      this.refreshBPData()
      this.buildCalendarData()
      this.updateHomeStats()
      this.updatePageTitle()
    })
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab, selectedDay: null })
    if (tab === 'elderBp') this.refreshBPData()
    this.updatePageTitle()
  },

  updatePageTitle() {
    const { elder, currentTab } = this.data
    const name = elder ? elder.name.split('（')[0] : ''
    const map = { elderHome: '首页', elderMeds: '药品', elderBp: '血压心率' }
    this.setData({ pageTitle: name + ' · ' + (map[currentTab] || '') })
  },

  updateHomeStats() {
    const { parentMeds } = this.data
    const taken = parentMeds.filter(m => m.status === 'taken').length
    const total = parentMeds.length
    const width = total > 0 ? (taken / total) * 100 : 0
    this.setData({ takenCount: taken, totalCount: total, progressWidth: width })
  },

  switchMedsSubTab(e) {
    const sub = e.currentTarget.dataset.sub
    this.setData({ medsSubTab: sub, selectedDay: null })
  },

  /* Calendar */
  buildCalendarData() {
    const { monthOffset, parentMeds, medFilter } = this.data
    const today = new Date(2026, 5, 8)
    const cursor = new Date(2026, 5 - monthOffset, 1)
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDow = cursor.getDay()
    const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth())

    const days = []
    for (let i = 0; i < firstDow; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const agg = this.dayAggregate(d)
      const isToday = isCurrentMonth && d === today.getDate()
      days.push({ day: d, agg, isToday })
    }

    // Month stats
    const filteredMeds = medFilter === 'all' ? parentMeds : parentMeds.filter(m => m.id === medFilter)
    let taken = 0, missed = 0, fullDays = 0
    const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
      .filter(d => !(isCurrentMonth && d > today.getDate()))
    allDays.forEach(d => {
      const ss = filteredMeds.map(m => this.dayStatus(d, m.id))
      if (ss.every(s => s === 'taken')) fullDays++
      ss.forEach(s => { if (s === 'taken') taken++; if (s === 'missed') missed++ })
    })
    const total = taken + missed
    const monthRate = total ? Math.round((taken / total) * 100) : 0

    this.setData({
      calendarDays: days,
      monthLabel: `${year}年${month + 1}月`,
      isCurrentMonth,
      dayTimeline: [],
      monthRate,
      monthMissed: missed,
      monthFullDays: fullDays,
      selectedDay: null,
    })
  },

  dayAggregate(d) {
    const { parentMeds, medFilter } = this.data
    const meds = medFilter === 'all' ? parentMeds : parentMeds.filter(m => m.id === medFilter)
    if (!meds || meds.length === 0) return 'future'
    const statuses = meds.map(m => this.dayStatus(d, m.id))
    if (statuses.every(s => s === 'future')) return 'future'
    if (statuses.includes('missed')) return 'missed'
    if (statuses.includes('pending')) return 'pending'
    if (statuses.includes('late')) return 'late'
    if (statuses.every(s => s === 'taken')) return 'taken'
    return 'none'
  },

  dayStatus(d, medId) {
    const { monthOffset } = this.data
    const today = new Date(2026, 5, 8)
    const cursor = new Date(2026, 5 - monthOffset, 1)
    const month = cursor.getMonth()
    const year = cursor.getFullYear()
    const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth())

    if (year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())) return 'future'
    if (isCurrentMonth && d > today.getDate()) return 'future'
    if (isCurrentMonth && d === today.getDate() && medId === 2) return 'pending'
    const dt = new Date(year, month, d)
    if (dt.getDay() === 0 && medId === 2 && d % 14 < 8) return 'missed'
    if (d === 4 && month === 5 && medId === 1) return 'missed'
    if (d === 5 && month === 5 && medId === 2) return 'missed'
    if ((d * (medId + 1)) % 11 === 0 && d > 1) return 'late'
    return 'taken'
  },

  selectDay(e) {
    const d = e.currentTarget.dataset.day
    if (this.data.selectedDay === d) {
      this.setData({ selectedDay: null, dayTimeline: [] })
      return
    }
    const agg = this.dayAggregate(d)
    if (agg === 'future') return
    this.buildDayTimeline(d)
    this.setData({ selectedDay: d })
  },

  buildDayTimeline(d) {
    const { parentMeds } = this.data
    const list = []
    parentMeds.forEach(m => {
      const times = m.times || ['08:00']
      times.forEach(t => {
        const s = this.dayStatus(d, m.id)
        if (s === 'future') return
        list.push({ time: t, name: m.name, dose: m.dose, status: s })
      })
    })
    list.sort((a, b) => a.time.localeCompare(b.time))
    this.setData({ dayTimeline: list })
  },

  shiftMonth(e) {
    const delta = parseInt(e.currentTarget.dataset.delta)
    const newOffset = Math.max(0, this.data.monthOffset + delta)
    this.setData({ monthOffset: newOffset }, () => this.buildCalendarData())
  },

  changeMedFilter(e) {
    const idx = parseInt(e.detail.value)
    const val = idx === 0 ? 'all' : this.data.parentMeds[idx - 1]?.id || 'all'
    this.setData({ medFilter: val, medFilterIdx: idx }, () => this.buildCalendarData())
  },

  /* BP */
  switchBpPeriod(e) {
    const period = e.currentTarget.dataset.period
    this.setData({ bpPeriod: period, bpPeriodOffset: 0 }, () => this.refreshBPData())
  },

  shiftBpPeriod(e) {
    const delta = parseInt(e.currentTarget.dataset.delta)
    const newOffset = Math.max(0, this.data.bpPeriodOffset + delta)
    this.setData({ bpPeriodOffset: newOffset }, () => this.refreshBPData())
  },

  refreshBPData() {
    const data = mockData.generateBPData(this.data.bpPeriod, this.data.bpPeriodOffset)
    this.setData({
      bpData: data,
      periodLabel: mockData.getPeriodLabel(this.data.bpPeriod, this.data.bpPeriodOffset),
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
      recentRecords: data.slice().reverse().slice(0, 7),
    })
  },

  /* Editing */
  startEditMed(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ editingMed: id })
  },

  stopEditMed() {
    this.setData({ editingMed: null })
  },

  goBack() {
    wx.navigateBack()
  },

  showAddMed() {
    this.setData({ showAddMedModal: true })
  },

  hideAddMed() {
    this.setData({ showAddMedModal: false })
  },
})
