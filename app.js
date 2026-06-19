const globalData = {
  userInfo: null,
  role: null,
  elders: [],
  medications: [],
  elderlyTab: null,
}

App({
  globalData,

  onLaunch() {
    // 初始化全局状态
    this.initMockData()
  },

  initMockData() {
    globalData.elders = [
      {
        id: 0,
        name: '妈妈（王阿姨）',
        emoji: '👩',
        phone: '138****5678',
        today: { taken: 1, total: 3, allDone: false },
        bp: { sys: 138, dia: 85, hr: 72, time: '08:30' },
        alerts: 2,
        lowStock: 1,
        medications: [
          { id: 1, name: '苯磺酸氨氯地平片', dose: '1片', times: ['08:00'], status: 'missed', remaining: 22, note: '餐后服用', history: [
            { label: '6/2', status: 'taken' }, { label: '6/3', status: 'taken' }, { label: '6/4', status: 'missed' },
            { label: '6/5', status: 'taken' }, { label: '6/6', status: 'taken' }, { label: '6/7', status: 'taken' },
            { label: '6/8', status: 'taken' }
          ]},
          { id: 2, name: '二甲双胍缓释片', dose: '1片', times: ['12:00'], status: 'pending', remaining: 8, note: '随餐服用', history: [
            { label: '6/2', status: 'taken' }, { label: '6/3', status: 'taken' }, { label: '6/4', status: 'taken' },
            { label: '6/5', status: 'missed' }, { label: '6/6', status: 'taken' }, { label: '6/7', status: 'taken' },
            { label: '6/8', status: 'pending' }
          ]},
          { id: 3, name: '阿托伐他汀钙片', dose: '1片', times: ['20:00'], status: 'pending', remaining: 15, note: '睡前服用', history: [
            { label: '6/2', status: 'taken' }, { label: '6/3', status: 'taken' }, { label: '6/4', status: 'taken' },
            { label: '6/5', status: 'taken' }, { label: '6/6', status: 'taken' }, { label: '6/7', status: 'taken' },
            { label: '6/8', status: 'pending' }
          ]},
        ],
        bpRecords: [
          { date: '06-08 08:30', sys: 138, dia: 85, hr: 72 },
          { date: '06-07 08:15', sys: 142, dia: 88, hr: 75 },
          { date: '06-06 08:45', sys: 135, dia: 82, hr: 70 },
        ],
      },
      {
        id: 1,
        name: '爸爸（王叔叔）',
        emoji: '👨',
        phone: '139****1234',
        today: { taken: 2, total: 2, allDone: true },
        bp: { sys: 128, dia: 78, hr: 68, time: '07:50' },
        alerts: 0,
        lowStock: 0,
        medications: [
          { id: 4, name: '厄贝沙坦片', dose: '1片', times: ['07:00'], status: 'taken', remaining: 30, note: '晨起服用', history: [
            { label: '6/2', status: 'taken' }, { label: '6/3', status: 'taken' }, { label: '6/4', status: 'taken' },
            { label: '6/5', status: 'taken' }, { label: '6/6', status: 'taken' }, { label: '6/7', status: 'taken' },
            { label: '6/8', status: 'taken' }
          ]},
          { id: 5, name: '阿司匹林肠溶片', dose: '1片', times: ['07:00'], status: 'taken', remaining: 25, note: '晨起服用', history: [
            { label: '6/2', status: 'taken' }, { label: '6/3', status: 'taken' }, { label: '6/4', status: 'taken' },
            { label: '6/5', status: 'taken' }, { label: '6/6', status: 'taken' }, { label: '6/7', status: 'taken' },
            { label: '6/8', status: 'taken' }
          ]},
        ],
        bpRecords: [
          { date: '06-08 07:50', sys: 128, dia: 78, hr: 68 },
          { date: '06-07 08:00', sys: 132, dia: 80, hr: 72 },
        ],
      },
    ]
  },
})
