Page({
  onLoad: function (options) {
    let that = this
    var temp_array = []
    for (let index = 0; index < 10; index++) {
      temp_array.push("../../image/hexagon_gray.png")
    }
    that.setData({
      image_array: temp_array
    })

    console.log(options.error_string)
    var error_string = options.error_string
    that.data.error_string = error_string
    // 倒序遍历
    // bit14(备用)	bit6 TDS 模块故障提醒
    // bit13(备用)	bit5 水质模块故障提醒
    // bit12(备用)	bit4 纯水流量传感器故
    // 障提醒
    // bit11(备用)	bit3 进水流量传感器故
    // 障提醒
    // bit10(备用)	bit2 取水压力传感器故
    // 障提醒
    // bit9 滤芯滤料故障
    // 报警	        bit1 膜前压力传感器故障
    // 提醒
    // bit8UV LED 故障
    // 提醒	        bit0 进水压力传感器故
    // 障提醒
    var index = 16
    var temp_image = that.data.image_array
    var temp_toast = that.data.toast_mark
    for (let i = error_string.length - 1; i >= 0; i--) {
      var mark = error_string[i];
      if (mark == 0) {
        index--;
      } else {
        console.log(index + "=> mark:" + mark)
        var error_image = that.data.error
        switch (index) {
          case 16:
            temp_image[0] = error_image
            temp_toast[0] = 1
            break;
          case 15:
            temp_image[1] = error_image
            temp_toast[1] = 1

            break;
          case 14:
            temp_image[2] = error_image
            temp_toast[2] = 1

            break;
          case 13:
            temp_image[3] = error_image
            temp_toast[3] = 1

            break;
          case 12:
            temp_image[4] = error_image
            temp_toast[4] = 1

            break;
          case 11:
            temp_image[5] = error_image
            temp_toast[5] = 1

            break;
          case 10:
            temp_image[6] = error_image
            temp_toast[6] = 1

            break;
          case 9:
            temp_image[7] = error_image
            temp_toast[7] = 1

            break;
          case 8:
            temp_image[8] = error_image
            temp_toast[8] = 1

            break;
          case 7:
            temp_image[9] = error_image
            temp_toast[9] = 1

            break;

          default:
            break;
        }
        index--;
      }
    }
    that.setData({
      image_array: temp_image,
      toast_mark: temp_toast
    })
  },

  click_0: function () {
    let that = this
    if (that.data.toast_mark[0] == 1) {
      var text = that.data.toast_array[0]
      console.log(text)
      that.showErrorToast(text)
    }
  },
  click_1: function () {
    if (this.data.toast_mark[1] == 1) {
      this.showErrorToast(this.data.toast_array[1])
    }
  },
  click_2: function () {
    if (this.data.toast_mark[2] == 1) {
      this.showErrorToast(this.data.toast_array[2])
    }
  },
  click_3: function () {
    if (this.data.toast_mark[3] == 1) {
      this.showErrorToast(this.data.toast_array[3])
    }
  },
  click_4: function () {
    if (this.data.toast_mark[4] == 1) {
      this.showErrorToast(this.data.toast_array[4])
    }
  },
  click_5: function () {
    if (this.data.toast_mark[5] == 1) {
      this.showErrorToast(this.data.toast_array[5])
    }
  },
  click_6: function () {
    if (this.data.toast_mark[6] == 1) {
      this.showErrorToast(this.data.toast_array[6])
    }
  },
  click_7: function () {
    if (this.data.toast_mark[7] == 1) {
      this.showErrorToast(this.data.toast_array[7])
    }
  },
  click_8: function () {
    if (this.data.toast_mark[8] == 1) {
      this.showErrorToast(this.data.toast_array[8])
    }
  },
  click_9: function () {
    if (this.data.toast_mark[9] == 1) {
      this.showErrorToast(this.data.toast_array[9])
    }
  },

  showErrorToast: function (toast_content) {
    console.log(toast_content)
    wx.showModal({
      title:'故障排查方法',
      content: toast_content,
      confirmText: '返回',
      confirmColor: '#1F65C9',
      showCancel: false,
      success: function(res){
        if (res.cancel) {
          
        }else{
          // wx.navigateBack()
        }
      }
    })
  },

  data: {
    error_string: '',
    // 正常
    nomal: "../../image/hexagon_gray.png",
    // error
    error: '../../image/error_bg.png',
    // imageArray
    image_array: [],
    // show mark
    toast_mark: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // toast_content
    toast_array: ["故障排查方法检查进水压力传感器的线路是否有断路、连接是否可靠，进水水路是否畅通，有无堵塞。",
      "故障排查方法检查膜前压力传感器是否有断路、连接是否可靠，过滤器有无堵塞。",
      "故障排查方法 检查取水压力传感器的线路是否有断路、连接是否可靠。",
      "故障排查方法检查进水流量传感器线路是否有断路， 连接是否可靠。 ",
      "故障排查方法检查纯水流量传感器线路是否有断路， 连接是否可靠。 ",
      "故障排查方法检查水质模块线路是否有断路， 连接是否可靠。 ",
      "故障排查方法检查TDS模块线路是否有断路， 连接是否可靠。 ",
      "故障排查方法检查液位传感器的线路是否有断路， 连接是否可靠。 ",
      "故障排查方法检查电箱内接线、 杀菌器灯管连接线是否松脱， 灯管是否老化损坏， 镇流器是否损坏。 ",
      "故障排查方法系统需要维护， 为确保水质安全， 请联系蓝鸥净水， 进行设备维护！ "
    ],
  }
})