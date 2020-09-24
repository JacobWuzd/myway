import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';

/*
 * @Author: your name
 * @Date: 2020-09-09 21:38:47
 * @LastEditTime: 2020-09-17 10:26:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack_study\webpack_style\src\index.js
 */

console.log("文件被加载了")

import './index.scss';
import './assets/style/a.css';
import './assets/style/b.css'; // import '@babel/polyfill';

function add(x, y) {
  return x + y;
}

const TEST = '000'
console.log(add(1, 2), TEST);

// 注册serviceworker
// 处理兼容问题
if ('serviceworker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功')
      })
      .catch(() => {
        console.log('sw注册失败')
      })
  })
}


