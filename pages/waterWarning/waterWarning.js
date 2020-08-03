Page({

  /**
   * 页面的初始数据
   */
  data: {
    warn: '',
    image_array: [],
    error: '../../image/error_bg.png',
    toast_mark: [0, 0, 0, 0, 0, 0],
    toast_array:["石英砂更换需要专业人员规范操作，请尽早联系设备生产商解决！", 
    "活性炭更换需要专业人员规范操作，请尽早联系设备生产商解决！",
    "软化树脂更换需要专业人员规范操作，请尽早联系设备生产商解决！",
    "更换流程\r\n1、关闭设备总电源；\r\n2、打开盐箱盖；\r\n3、投入适量软化专用盐；\r\n4、合上盐箱盖；\r\n5、开启设备总电源；\r\n6、在控制界面上进入“用户登录”页面，进入“滤芯滤料”，点击再生盐“更换重置”。\r\n注意事项\r\n1、必须使用软化专用盐（纯度99.5%），切勿使用食用盐或其他工业盐替代；\r\n2、必须加入足量软化盐；\r\n3、不要将盐撒进盐箱中的盐井，不可倒出盐箱中的存水；\r\n4、须使用设备生产商推荐型号、品牌软化盐；\r\n5、盐为可以高于水面，但一般不超过盐箱容积2/3；\r\n6、更换前请仔细阅读设备使用说明书，过程中如有任何疑问请联系设备生产商。",
    "更换流程\r\n1、关闭设备总电源、进水阀门；\r\n2、排气、排水；\r\n3、打开抱箍、端盖，卸下滤芯不锈钢压板，取出旧滤芯，注意下方旧垫圈不要遗漏；\r\n4、安装新滤芯，注意滤芯上下垫圈不能缺失，安装不锈钢压板、端盖、抱箍，注意密封条平等以及上方压力表方向；\r\n5、关闭保安过滤器排水阀，打开设备进水球阀；\r\n6、排气，待空气全部排出，已经出水时，关闭排气阀；\r\n7、开启设备总电源，检查是否正确安装及有无泄漏情况；\r\n8、在控制界面上进入“系统登录”页面，进入“滤芯滤料”，点击精密滤芯“更换重置”。\r\n注意事项\r\n1、更换滤芯时必须切断设备电源、进水开关；\r\n2、新滤芯信号必须与设备匹配，需使用设备生产商推荐型号、滤芯生产商；\r\n3、取出旧滤芯时，安保过滤器内不得遗留旧滤芯垫圈。反之，安装滤芯时不得缺失上下垫圈；\r\n4、过滤器内滤芯更换完毕后，一定要排空空气才能正常使用；\r\n5、工作完成后注意再次检测进出口阀门；\r\n6、更换前请仔细阅读设备使用说明书，过程中如有任何疑问请联系设备生产商。",
    "RO膜更换需要专业人员规范操作，请尽早联系设备生产商解决！",
    "更换流程\r\n1、关闭设备总电源及消毒器进、出水阀；\r\n2、柠送塑料螺母，取出灯管；\r\n3、插入新的UV灯管拧紧塑料螺母；\r\n4、插上灯管电源适配器；\r\n5、打开UV消毒器进、出水阀；\r\n6、开启设备总电源，检测UV灯是否正常工作；\r\n7、在控制界面上进入“用户登录”页面，进入“滤芯滤料”，点击UV灯”更换重置“。\r\n注意事项\r\n1、更换时必须切断设备电源、进/出水开关；\r\n2、更换过程如发生灯管或消毒器内壁任何程度破损，必须重新全部重新更换；\r\n3、不可直接在消毒器外面对UV灯管通电试验，以免紫外线灼伤眼睛、皮肤及人体其他部位；\r\n4、工作完成后注意检查进出口阀门；\r\n5、须使用设备生产商推荐灯管生产厂商及规格，更换前请仔细阅读设备使用说明书，过程中如有任何疑问请联系设备生产商。"
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var temp_array = []
    for (let index = 0; index < 7; index++) {
      temp_array.push("../../image/hexagon_gray.png")
    }
    that.setData({
      image_array: temp_array
    })
    console.log(options.warn_string)
    var warn = options.warn_string
    that.data.warn = warn

    var index = 16
    var temp_image = that.data.image_array
    var temp_toast = that.data.toast_mark
    for (let i = warn.length - 1; i >= 0; i--) {
      var mark = warn[i];
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
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
  showErrorToast: function (toast_content) {
    console.log(toast_content)
    wx.showModal({
      title:'注意事项',
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
  }
})