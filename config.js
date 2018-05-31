/**
 * 小程序配置文件
 */

// 此处域名
var host = 'https://www.snaildocs.com';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 获取CODE地址，用于建立会话
        loginUrl: `${host}/wechat/user/login`,
        // 获取用户信息
        loginInfo: `${host}/wechat/user/info`,
        // 获取活动列表
        activitylist: `${host}/wechat/user/get/activity/list`,
        // 用户初始步数状态
        stepStatus: `${host}/wechat/user/get/step/status`,
        // 获取微信步数
        steplist: `${host}/wechat/user/encryptedData`,
        //保存活动轨迹
        savetrack: `${host}/wechat/user/save/track`,
        //  获取活动详情
        actDetail: `${host}/wechat/user/get/activity/detail`,
        // 用户活动报名
        doActivity: `${host}/wechat/user/do/activity`,
        // 获取我的活动
        myActivity: `${host}/wechat/user/get/my/activity/list`,
        //保存步数
        saveStep: `${host}/wechat/user/save/step`,
        //成就列表
        achievementList: `${host}/wechat/user/get/achievement/list`,
        //获取我的活动
        stepList: `${host}/wechat/user/get/step/list`,
    }
};

module.exports = config;