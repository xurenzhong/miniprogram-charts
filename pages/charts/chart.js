import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
/// 折线图
function getOption(xData, data_cur, data_his) {
  const option = {
    backgroundColor: "#142756",
    color: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
    title: {
      textStyle: {
        fontWeight: '500',
        fontSize: 15,
        color: '#000'
      },
      x: 'center',
      y: '0'
    },
    grid: {
      top: '3%',
      left: '3%',
      right: '3%',
      bottom: '60rpx',
      containLabel: true
    },
    tooltip: {
      show: false,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData || [],
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          return value.substring(0, 2) * 1;
        },
        textStyle: {
          fontsize: '10px',
          color: '#ffffff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      min: 0,
      max: 500,
      splitLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontsize: '8px',
          color: '#ffffff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      }
    },
    series: [{
      name: '今日',
      zIndex: 2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      symbolSize: 6,
      itemStyle: {
        normal: {
          borderColor: '#E69900', //拐点边框颜色
        }
      },
      color: ['#E69900'],
      data: data_cur || []
    }, {
      name: '昨日',
      zIndex: 1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      symbolSize: 6,
      color: ['#00D06E'],
      data: data_his || []
    }]
  };
  return option;
}

/// 环状图
function getPieOption(value, data_cur, data_his) {
  const option = {
    series: [{
      type: 'pie',//指定类型为饼状图
      clockWise: true,
      radius: ['70%', '75%'],//指定半径，注意不建议直接指定px，不利于自适应。
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: true,
      data: [{
        value: value,
        name: 'completed',
        itemStyle: {
          normal: {
            borderWidth: 5,
            borderColor: {
              colorStops: [{
                offset: 0,
                color: '#F13577' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#6076E1' // 100% 处的颜色
              }]
            },

            label: {
              show: true
            },
            labelLine: {
              show: true
            }
          }
        }
      }, {
        name: 'gap',
        value: 100 - value,
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
          }
        }
      }]
    }]
  };
  return option;
}

let chartLine;
let chartPie_0;
let chartPie_1;
Page({
  onShareAppMessage: res => {
    return {}
  },
  onLoad: function () {

  },

  data: {
    ec_line: {
      // 将lazyload设为ture后，需要手动初始化图表
      onInit: function (canvas, width, height) {
        // 初始化echarts元素，绑定到全局变量，方便改变数据
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);

        // 可以先不setOption， 等待数据加载好后赋值
        // 不过那样就没有setOpton前， echarts元素一片空白，体验不好，所以先setOption
        var xData = [26, 28, 30, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26];
        var data_cur = [5, 10, 150, 20, 25, 30, 350, 40, 450, 50, 100, 150, 144, 133, 122, 135];
        var data_his = [55, 56, 49, 55, 50, 49, 39, 88, 66, 55, 59, 33, 67, 43, 55, 45];
        var option = getOption(xData, data_cur, data_his);
        chartLine.setOption(option);
      }
    },
    ec_pie_0: {
      onInit: function (canvas, width, height) {
        chartPie_0 = echarts.init(canvas, null, {
          width: width,
          height:height
        });
        canvas.setChart(chartPie_0);

        var xData = [];
        var data_cur = [];
        var data_his = [];
        var option = getPieOption(80, data_cur, data_his);
        chartPie_0.setOption(option);
        chartPie_0.resize();
      }
    },
    ec_pie_1: {
      onInit: function (canvas, width, height) {
        chartPie_1 = echarts.init(canvas, null, {
          width: width,
          height:height
        });
        canvas.setChart(chartPie_1);

        var xData = [];
        var data_cur = [];
        var data_his = [];
        var option = getPieOption(65, data_cur, data_his);
        chartPie_1.setOption(option);
        chartPie_1.resize();
      }
    }
  }
})