
import Echarts from 'echarts'

export function createChart(domId, options) {
  let mychart = Echarts.init(document.getElementById(domId))
  
  mychart.setOption(options)
}

export function createChartId() {
  return 'dom-id-' + Math.random().toString(36).substr(2)
}

