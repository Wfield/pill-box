function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatTime(date) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

function formatDateTime(date) {
  return `${formatDate(date)} ${formatTime(date)}`
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function firstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function throttle(fn, delay = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      return fn.apply(this, args)
    }
  }
}

function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

function getBPStatus(sys, dia) {
  if (sys >= 140 || dia >= 90) return 'abnormal'
  if (sys >= 120 || dia >= 80) return 'elevated'
  return 'normal'
}

function getHRStatus(hr) {
  if (hr < 60 || hr > 100) return 'abnormal'
  return 'normal'
}

function getMedStatusLabel(status) {
  const map = {
    taken: '已服',
    missed: '漏服',
    pending: '待服',
    late: '补服',
    future: '未来',
  }
  return map[status] || status
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

module.exports = {
  formatDate,
  formatTime,
  formatDateTime,
  daysInMonth,
  firstDayOfMonth,
  throttle,
  debounce,
  getBPStatus,
  getHRStatus,
  getMedStatusLabel,
  WEEK_DAYS,
}
