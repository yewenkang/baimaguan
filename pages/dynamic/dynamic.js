// pages/dynamic/dynamic.js
let config = require('./../../config')
let sliderWidth
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    // tab切换
    tabs: ["途友分享", "赛制公告", "景区介绍","联系客服"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    start: 0,
    dataArray: [],
    // tab切换  
    currentTab: 0,
    menudata:
    {
      imgUrls: [
        {
          'imgpath': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'url': '../index/index', 'title': '每日8000步活动'
        },
        { 'imgpath': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'url': '', 'title': '白马关' },
        { 'imgpath': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'url': '', 'title': '领导视察' }
      ]
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          controls: [{
            id: 1,
            iconPath: '../image/pao.png',
            position: {
              left: res.windowWidth / 2 - 25,
              top: res.windowHeight - 100,
              width: 50,
              height: 50
            },
            clickable: true
          }],
        });
      }

    });
    
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  phone:function(){
    wx.makePhoneCall({
      phoneNumber: '0838-3202577' 
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

  }
})