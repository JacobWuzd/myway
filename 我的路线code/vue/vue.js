/*
 * @Author: your name
 * @Date: 2020-08-19 22:30:56
 * @LastEditTime: 2020-08-21 11:41:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \我的路线code\vue\手写vue.js
 */
class MVue {
  constructor(options) {
    // 获取vue的所有属性
    this.$options = options
    // 获取data数据
    this.$data = options.data
    // 传递给observe方法去递归遍历
    this.observe(this.$data)
    // 编译处理
    new Complie(options.el, this)
    if (options.created) {
      options.created.call(this)
    }
  }

  observe(value) {
    if (!value || typeof value !== 'object') {
      return
    }
    // 遍历data数据中的每个属性
    Object.keys(value).forEach(key => {
      // 响应式处理
      this.defineReactive(value, key, value[key])
      // 代理Mvue，即把数据挂载到Mvue实例上
      this.proxyData(key)
    })
  }

  defineReactive(obj, key, val) {
    // 如果该数据还存在引用类型，递归val
    this.observe(val)

    // 定义一个Dep,每个dep实例和data中的每个key有一个一对一的关系
    const dep = new Dep()
    // 每个数据劫持
    Object.defineProperty(obj, key, {
      get () {
        // 依赖收集
        Dep.target && dep.addDep(Dep.target)
        return val
      },

      set (newVal) {
        if (newVal !== val) {
          val = newVal
          // console.log(key + "属性更新")
          dep.notify()
        }
      }
    })
  }

  // 在vue根上定义属性代理data中的数据
  proxyData (key) {
    // this指向Mvue的实例
    Object.defineProperty(this, key, {
      get () {
        return this.$data[key]
      },
      set (newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// 创建Dep类，管理所有的watcher
class Dep {
  constructor() {
    // 存储所有依赖
    this.deps = []
  }
  // 添加依赖
  addDep (dep) {
    this.deps.push(dep)
  }
  // 通知更新 
  notify () {
    this.deps.forEach(dep => {
      // 调用watcher的更新方法
      dep.update()
    })
  }
}

// 创建watcher，保存data中的数值和页面中的挂钩关系
class Watcher {
  /**
   * @description: 
   * @param vm {type} 某个组件中的实例
   * @return key {type} 这个实例中的key
   */
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 创建实例时，立即将该实例指向Dep.target便于依赖收集
    Dep.target = this
    // 触发依赖更新，即可触发defineProprety的get方法，再次触发依赖收集
    this.vm[this.key] 
    Dep.target = null
  }

  // 更新
  update () {
    this.cb.call(this.vm, this.vm[this.key])
  }
}