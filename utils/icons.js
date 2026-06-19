const ICONS = {
  home: {
    viewBox: '0 0 24 24',
    paths: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  },
  heart: {
    viewBox: '0 0 24 24',
    paths: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/>',
  },
  pill: {
    viewBox: '0 0 24 24',
    paths: '<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/>',
  },
  phone: {
    viewBox: '0 0 24 24',
    paths: '<path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  },
  chart: {
    viewBox: '0 0 24 24',
    paths: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 14 3-4 3 2 4-6"/>',
  },
  list: {
    viewBox: '0 0 24 24',
    paths: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="0.8"/><circle cx="4" cy="12" r="0.8"/><circle cx="4" cy="18" r="0.8"/>',
  },
  gear: {
    viewBox: '0 0 24 24',
    paths: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  },
  camera: {
    viewBox: '0 0 24 24',
    paths: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>',
  },
  cameraLg: {
    viewBox: '0 0 24 24',
    paths: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>',
  },
  edit: {
    viewBox: '0 0 24 24',
    paths: '<path d="M4 20h4L19 9l-4-4L4 16Z"/><path d="m14 6 4 4"/>',
  },
  check: {
    viewBox: '0 0 24 24',
    paths: '<path d="m5 12 5 5L20 7"/>',
  },
  clock: {
    viewBox: '0 0 24 24',
    paths: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  },
  bell: {
    viewBox: '0 0 24 24',
    paths: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  },
  plus: {
    viewBox: '0 0 24 24',
    paths: '<path d="M12 5v14M5 12h14"/>',
  },
  warn: {
    viewBox: '0 0 24 24',
    paths: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.5"/>',
  },
  user: {
    viewBox: '0 0 24 24',
    paths: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  },
  chevron: {
    viewBox: '0 0 24 24',
    paths: '<path d="m9 6 6 6-6 6"/>',
  },
  chevronLeft: {
    viewBox: '0 0 24 24',
    paths: '<path d="m15 6-6 6 6 6"/>',
  },
  flame: {
    viewBox: '0 0 24 24',
    paths: '<path d="M12 3c1 4 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-5 1 1 1 2 3 1Z"/>',
  },
  thumbUp: {
    viewBox: '0 0 24 24',
    paths: '<path d="M7 11v9H4v-9Z"/><path d="M7 11h7l3-7c2 0 3 1 3 3l-2 5h2a2 2 0 0 1 0 4h-2l-1 4H7"/>',
  },
  sparkle: {
    viewBox: '0 0 24 24',
    paths: '<path d="M12 4v3M12 17v3M4 12h3M17 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/>',
  },
  send: {
    viewBox: '0 0 24 24',
    paths: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/>',
  },
  pillbox: {
    viewBox: '0 0 48 48',
    strokeWidth: 2.5,
    paths: '<rect x="8" y="14" width="32" height="28" rx="4"/><path d="M8 22h32"/><path d="M24 22v20"/><rect x="6" y="8" width="36" height="6" rx="3"/><circle cx="16" cy="30" r="2" fill="currentColor" stroke="none"/><circle cx="32" cy="30" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="38" r="1.5" fill="currentColor" stroke="none"/><circle cx="32" cy="38" r="1.5" fill="currentColor" stroke="none"/>',
  },
}

function buildIconSrc(name, color, stroke) {
  const icon = ICONS[name]
  if (!icon) return ''
  const strokeWidth = icon.strokeWidth || stroke || 1.8
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg"',
    `viewBox="${icon.viewBox}"`,
    'fill="none"',
    `stroke="${color}"`,
    `stroke-width="${strokeWidth}"`,
    'stroke-linecap="round"',
    'stroke-linejoin="round">',
    icon.paths,
    '</svg>',
  ].join(' ')
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

module.exports = {
  ICONS,
  buildIconSrc,
}
