function generateBPData(kind, offset) {
  if (kind === 'day') {
    return Array.from({ length: 6 }, (_, i) => {
      const seed = offset * 6 + i
      const hours = ['07:00', '10:00', '13:00', '16:00', '19:00', '22:00']
      return {
        label: hours[i],
        sys: 132 + Math.round(Math.sin(seed / 1.3) * 10 + (seed % 4)),
        dia: 82 + Math.round(Math.cos(seed / 1.5) * 5 + (seed % 2)),
        hr: 72 + Math.round(Math.sin(seed / 1.6) * 10),
      }
    })
  }
  if (kind === 'week') {
    return Array.from({ length: 7 }, (_, i) => {
      const seed = offset * 7 + i
      const baseDate = offset === 0 ? `6/${2 + i}` : offset === 1 ? `5/${26 + i}` : `5/${19 + i}`
      return {
        label: baseDate,
        sys: 130 + Math.round(Math.sin(seed / 2) * 12 + (seed % 5)),
        dia: 80 + Math.round(Math.cos(seed / 2) * 7 + (seed % 3)),
        hr: 72 + Math.round(Math.sin(seed / 3) * 18),
      }
    })
  }
  if (kind === 'month') {
    return Array.from({ length: 30 }, (_, i) => {
      const seed = offset * 30 + i
      return {
        label: `${offset === 0 ? 6 : 5}/${(i % 30) + 1}`,
        sys: 128 + Math.round(Math.sin(seed / 3) * 12 + (seed % 5)),
        dia: 78 + Math.round(Math.cos(seed / 4) * 7 + (seed % 3)),
        hr: 70 + Math.round(Math.sin(seed / 5) * 18),
      }
    })
  }
  return Array.from({ length: 12 }, (_, i) => {
    const seed = offset * 12 + i
    return {
      label: `${i + 1}月`,
      sys: 130 + Math.round(Math.sin(seed / 2) * 8 + (seed % 4)),
      dia: 80 + Math.round(Math.cos(seed / 2) * 5 + (seed % 2)),
      hr: 72 + Math.round(Math.sin(seed / 3) * 12),
    }
  })
}

function getPeriodLabel(kind, offset) {
  if (kind === 'day') {
    return offset === 0 ? '今天 6/8' : offset === 1 ? '昨天 6/7' : `${offset}天前`
  }
  if (kind === 'week') {
    return offset === 0 ? '本周 6/2-6/8' : offset === 1 ? '上周 5/26-6/1' : `${offset}周前`
  }
  if (kind === 'month') {
    return offset === 0 ? '6月' : offset === 1 ? '5月' : `${offset}月前`
  }
  return offset === 0 ? '2026年' : `${2026 - offset}年`
}

const ALL_TIMES = ['08:00', '12:00', '18:00', '20:00', '22:00']

module.exports = {
  generateBPData,
  getPeriodLabel,
  ALL_TIMES,
}
