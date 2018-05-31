// pages/step/step.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

let util = require('./../../utils/util')
let config = require('./../../config')
let sliderWidth
let point = []
let starstep
let step
let time
let distance = 0
let clocktime
let micro_second = 0
let btnstate = 1

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#fff",
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],

    tooltip: {
      trigger: 'axis'
    },
    legend: {

      data: ['天', '周']
    },
    grid: {
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      x: 'center',
      type: 'value'
    },
    series: [{
      name: '天',
      type: 'line',
      barWidth:'10%',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: '周',
      type: 'line',
      barWidth: '10%',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }]
  };

  chart.setOption(option);
  return chart;
}


Page({

  data: {

    ec: {
      onInit: initChart
    },
   
    winWidth: 0,
    winHeight: 0,
  
    state: 1,  //1结束，2开始
    stepnum: 0,//步数

    //成就列表
    achievementList:[],

    // tab切换
    tabs: ["步数", "成就", "分享", "消息"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    dis: '0.00',
    controls: [{
      id: 1,
      iconPath: '../image/end.png',
      position: {
        left: 162.5,
        top: 450,
        width: 50,
        height: 50
      },
      clickable: true
    }],

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    that.clock()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          btnstate: btnstate,
          controls: [{
            id: 1,
            iconPath: '../image/end.png',
            position: {
              left: res.windowWidth / 2 - 40,
              top: res.windowHeight - 125,
              width: 80,
              height: 80
            },
            clickable: true
          }],
        });
      }
    });

    //成就列表
    wx.request({
      url: config.service.achievementList + '?userId=' + wx.getStorageSync('userId'),
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        if(res.data.code == 200){
          that.setData({
            achievementList: res.data.data.list
          })
        }else{
          wx.showToast({ title: '成就列表失败，请联系管理员！', icon: 'loading', duration: 1000 })
        }
      }
    })

  },


  //切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          location: res
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    //初始化用户计算步数状态
    // wx.getLocation({
    //   success: function (res) {
    //     let lat1 = that.toRadians(31.2804)
    //     let lat2 = that.toRadians(res.latitude)
    //     let lat3 = lat1 - lat2
    //     let lon = that.toRadians(104.47081) - that.toRadians(res.longitude)
    //     let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(lat3 / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lon / 2), 2)));
    //     console.log(dis)
    //     if (dis * 6378137 < 3000) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '请在景区范围内使用计步功能',
    //         confirmText: '建议线路',
    //         success: function (res) {
    //           if (res.confirm) {
    //             wx.navigateTo({
    //               url: '../sugline/sugline',
    //             })
    //           } else if (res.cancel) {
    //             console.log('用户点击取消')
    //           }
    //         }
    //       })
    //     } else {
    //       wx.request({
    //         url: config.service.stepStatus + '?userId=' + wx.getStorageSync('userId'),
    //         method: 'POST',
    //         header: { "Content-Type": "application/x-www-form-urlencoded" },
    //         success: res => {
    //           if (res.data.code == 200) {
    //             if (res.data.data.status == true) {
    //               const innerAudioContext = wx.createInnerAudioContext()
    //               innerAudioContext.src = 'https://www.snaildocs.com/base/images/start.m4a'
    //               innerAudioContext.play()
    //               that.getrun()
    //               that.timer()
    //             } else {
    //               that.getrun()
    //               that.getrun()
    //               that.timer()
    //             }
    //           } else {
    //             wx.showToast({ title: '计步状态返回失败', icon: 'loading', duration: 1000 })
    //           }
    //         }
    //       })

    //     }
    //   }
    // })
  },
  //刷新步数
  clock: function () {
    let that = this
    clocktime = setInterval(function () {
      wx.getLocation({
        success: function (res) {
          let lat1 = that.toRadians(31.2804)
          let lat2 = that.toRadians(res.latitude)
          let lat3 = lat1 - lat2
          let lon = that.toRadians(104.47081) - that.toRadians(res.longitude)
          let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(lat3 / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lon / 2), 2)));
          if (dis * 6378137 < 3000) {
            wx.showModal({
              title: '提示',
              content: '请在景区范围内使用计步功能',
              confirmText: '建议线路',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../sugline/sugline',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if (wx.getStorageSync('userId')) {
            wx.request({
              url: config.service.stepStatus + '?userId=' + wx.getStorageSync('userId'),
              method: 'POST',
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              success: res => {
                if (res.data.code == 200) {
                  if (res.data.data.status == true) {
                    const innerAudioContext = wx.createInnerAudioContext()
                    innerAudioContext.src = 'https://www.snaildocs.com/base/images/start.m4a'
                    innerAudioContext.play()
                    that.getrun()
                    that.timer()
                  } else {
                    that.getrun()
                    that.getrun()
                    that.timer()
                  }
                } else {
                  wx.showToast({ title: '计步状态返回失败', icon: 'loading', duration: 1000 })
                }
              }
            })

          }
        }
      })
    }, 10000)
  },
  //轨迹
  timer: function () {
    let that = this
    time = setInterval(function () {
      let points = { latitude: '', longitude: '' }
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          points.latitude = res.latitude + ''
          points.longitude = res.longitude + ''
          point.push(points)
          wx.request({
            url: config.service.savetrack + '?userId=' + wx.getStorageSync('userId') + '&lat=' + points.latitude + '&lng=' + points.longitude,
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: res => {

            }
          })
          that.setData({
            location: res,
            polyline: [{
              points: point,
              color: "#1F9AE4",
              width: 4,
              dottedLine: false
            }],
          })
        },
      })
    }, 5000)
  },
  //步数算法
  getrun: function () {
    let that = this
    wx.getWeRunData({
      success: res => {
        wx.request({
          url: config.service.steplist,
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv,
            sessionKey: wx.getStorageSync('sessionKey')
          },
          success: data => {
            that.data.stepnup = data.data.data.data.stepInfoList[30].step
            wx.request({
              url: config.service.saveStep + '?userId=' + wx.getStorageSync('userId') + '&step=' + data.data.data.data.stepInfoList[30].step,
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              method: 'POST',
              success: res => {
                console.log(res.data.data.steps)
                if (res.data.code == 200) {
                  that.setData({
                    stepnum: res.data.data.steps
                  })
                } else {
                  wx.showToast({ title: '获取步数失败', icon: 'loading', duration: 2000 })
                }
              }
            })
          }
        })
      }
    })
  },

  toRadians: function (e) { return e * Math.PI / 180; },

  //计步开始
  /*kaishi:function(){
    let that = this
    wx.getLocation({
      success: function(res) {
        let lat1 = that.toRadians(31.2804)
        let lat2 = that.toRadians(res.latitude)
        let lat3 = lat1 - lat2
        let lon = that.toRadians(104.47081) - that.toRadians(res.longitude)
        let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(lat3 / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lon / 2), 2)));
        if (dis * 6378137<3000){
          wx.showToast({ title: '请在范围内点击', icon: 'loading', duration: 2000 })
        }else{
          const innerAudioContext = wx.createInnerAudioContext()
          innerAudioContext.src = 'https://www.snaildocs.com/base/images/start.m4a'
          innerAudioContext.play()
          that.setData({
            state: 2
          })
          that.timer()
          that.getrun()
        }
      },
    })
  },
*/

  //计步结束
  /*jieshu:function(){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = 'https://www.snaildocs.com/base/images/end.m4a'
    innerAudioContext.play()
    let that = this
    that.setData({
      state: 1,
    })
    clearInterval(time)
    that.getrun()
  },*/

  /*
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(clocktime)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})