// components/classic/music/index.js
import { classicBeh } from "../classic-beh.js"
// 返回我们需要的音乐管理对象  获取全局唯一的背景音频管理器
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  // 属性的继承
  behaviors: [classicBeh],
  properties: {
    // 音乐播放的两个必备属性
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,  // 播放状态
    pauseSrc: "images/player@paused.png",
    playSrc: "images/player@playing.png"
  },

  // detached在组件实例被从页面节点树移除时执行
  // detached: function (event) {
    // 停止播放音乐
    // mMgr.stop()
  // },
  // attached在组件实例进入页面节点树时执行
  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
      
    },
    _recoverStatus: function () {
      // 当前没有任何的音乐在播放
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 如果当前播放的音乐就是当前music组件播放的音乐
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    // 音乐总开关状态设置
    _monitorSwitch: function () {
      // 监听背景音频播放事件 背景音频播放事件的回调函数
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      // 监听背景音频暂停事件
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      // 监听背景音频停止事件
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 监听背景音频自然播放结束事件
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
