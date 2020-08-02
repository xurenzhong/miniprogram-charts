import * as echarts from '../../ec-canvas/echarts';

function initFChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['75%', '95%'],
      animationType: 'scale',
      silent: true,
      startAngle: 270,
      clockWise:false,　　　　　　//默认逆时针
      labelLine: {
        normal: {
          show: false
        }
      },
      label: {
        normal: {
          show: true,
          position: 'center',
          color: '#46D887',
          fontSize: 15,
          formatter: '20%\n2500m³'
        }
      },
      data: [{
          value: 10
        },
        {
          value: 2
        }
      ],
      color: ["#000000", "#46D887"]
    }]
  }

  chart.setOption(option);
  return chart;
}

function initSChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['75%', '95%'],
      animationType: 'scale',
      silent: true,
      startAngle: 270,
      clockWise:false,　　　　　　//默认逆时针
      labelLine: {
        normal: {
          show: false
        }
      },
      label: {
        normal: {
          show: true,
          position: 'center',
          color: '#1893C1',
          fontSize: 15,
          formatter: '30%\n365days'
        }
      },
      data: [{
          value: 10
        },
        {
          value: 3
        }
      ],
      color: ["#000000", "#1893C1"]
    }]
  }

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data_string)
    wx.setNavigationBarTitle({
      title: options.title,
    })
    var data_string = options.data_string
    /// 总量
    var total_16 = data_string.slice(0, 4)
    var total_10 = parseInt(total_16.toString(16), 16)
    this.setData({
      flu_total: '范围：0~' + total_10 + 'm³'
    })

    /// 使用量
    var use_16 = data_string.slice(4, 8)
    var use_10 = parseInt(use_16.toString(16), 16) * 0.1

    /// 总时间
    var total_time_16 = data_string.slice(8, 12)
    var total_time_10 = parseInt(total_time_16.toString(16), 16)
    this.setData({
      time_total: '范围：0~' + total_time_10 + 'days'
    })

    /// 使用时间
    var use_time_16 = data_string.slice(12, 16)
    var use_time_10 = parseInt(use_time_16.toString(16), 16)

    // 水量比
    var water_ratio = use_10 / total_10 * 1.0
    var day_ration = use_time_10 / total_time_10 * 1.0

    console.log("已滤进水百分比：" + use_10 + "/" + total_10 + "=" + water_ratio)
    console.log("使用天数百分比：" + day_ration)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面的初始数据
   */
  data: {
    f_ec: {
      onInit: initFChart
    },

    s_ec: {
      onInit: initSChart
    },

    // 范围1
    flu_total: '',

    // 范围2
    time_total: ''
  },
});