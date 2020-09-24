/*
 * @Author: your name
 * @Date: 2020-09-16 22:39:55
 * @LastEditTime: 2020-09-16 23:36:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \我的路线\我的路线code\JS篇\正则\对象.js
 */
// 全局 reg.gobal
// reg.test(str) 返回结果boolean
// reg.exec(str) 返回一个匹配类数组,每匹配一轮，都会记录一次匹配的下标，在下一轮匹配开始就以上一轮的下标之后的开始匹配
// reg.lastIndex是exec()上一轮匹配的步数，可以更改lastIndex来改变exec()本轮匹配的位置
// match(正则表达式)：字符串对象,返回一个类数组，自动循环匹配（//g）