// pages/actdetial/actdetial.js
let util = require('./../../utils/util')
var config = require('./../../config')
let sliderWidth
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    tabs: ["累计步数", "达标天数","每日步数"],
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
    baoming:1,
    isDo:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    that.data.actId = options.actId
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    let userID = wx.getStorageSync('userId')
    wx.request({
      url: config.service.actDetail + '?activityId=' + options.actId + '&userId='+userID+'&page=0&size=10',
      method:'POST',
      success:res=>{

        if(res.data.data.status == 2){
          that.data.isDo = 3
          that.setData({
            data: res.data.data,
            isDo: that.data.isDo
          })
        }else{
          that.data.isDo = res.data.data.isDo
          that.setData({
            data: res.data.data,
            isDo: that.data.isDo
          })
        }
      }
    })
    wx.request({
      url: config.service.stepList + '?activityId=' + options.actId + '&userId=' + userID + '&page=0&size=10',
      method: 'POST',
      success:res=>{
        that.setData({
          meiri:res.data.data.stepList
        })
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  baoming:function(){
    let that = this
    wx.request({
      url: config.service.doActivity + '?activityId=' + that.data.actId +'&userId='+wx.getStorageSync('userId'),
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success:res=>{
        if(res.statusCode == 200){
          util.showSuccess('报名成功')
          that.setData({
            isDo:false
          })
        }
      }
    })
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