/*
 * @Author: your name
 * @Date: 2020-08-19 23:25:15
 * @LastEditTime: 2020-08-21 11:49:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \我的路线code\vue\compile.js
 */
// 遍历dom结构，解析指令和插值表达式
class Complie {
  // el:带编译的模板  vm：Mvue实例
  constructor(el, vm) {
    this.$vm = vm
    // 挂载节点
    this.$el = document.querySelector(el)
    // 把模板中的内容移动到片段中操作
    this.$fragment = this.node2Fragment(this.$el)
    // 执行编译
    this.complie(this.$fragment)
    // 放回$el中
    this.$el.appendChild(this.$fragment)
  }

  node2Fragment(el) {
    // 创建片段，即虚拟节点对象
    const fragment = document.createDocumentFragment();
    
    let child;
    while(child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }

  complie(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (node.nodeType == 1) {
        // 元素
        this.complieElement(node)
      } else if (this.isInter(node)) {
        // 只关心{{xxx}}插值
        this.complieText(node)
      }

      // 递归子节点
      if (node.children && node.childNodes.length > 0) {
        this.complie(node)
      }
    })
  }
  
  // 判断是不是插值表达式
  isInter(node) {
    // 如果是文本节点，就对齐值进行匹配
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  complieElement (node) {
    // 关心属性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value
      // 如果检测到有v-字眼的属性，就解析该属性内部的值
      if (attrName.indexOf('v-') == 0) {
        // 解析这个属性类别，即v-后面的跟着的属性名
        const dir = attrName.substring(2)
        // 调用并执行解析该属性的方法
        this[dir] && this[dir](node, exp)
      }
    })
    
  }

  complieText (node) {
    // 表达式
    const exp = RegExp.$1
    // 更新key的值
    this.update(node, exp, 'text')
  }

  update(node, exp, dir) {
    const updator = this[dir + 'Updator']
    // 初始化更新
    updator && updator(node, this.$vm[exp])
    // 创建watcher实例，依赖收集完成
    new Watcher(this.$vm, exp, function(value){
      // 动态更新
      updator && updator(node, value)
    })
  }

  textUpdator(node, value) {
    node.textContent = value
  }

  text(node, exp) {
    this.update(node, exp, 'text')
  }
}