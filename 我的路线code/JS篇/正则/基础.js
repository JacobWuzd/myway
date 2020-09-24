/*
 * @Author: your name
 * @Date: 2020-09-15 21:15:50
 * @LastEditTime: 2020-09-16 22:37:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \我的路线\我的路线code\JS篇\正则\基础.js
 */

// 1.转义符号 '\'，转义字符 '\字符符号' 换行符\n 
// document.write()会把\n \r识别为空字符，是因为doucment.write是给html文本的，不是编辑系统
// 换行在各个系统下的区别 windows：\r\n mac:\r linux: \n
var str1 = "我是一个菜鸟，不会\"正则表达式\"" // 我是一个菜鸟，不会"正则表达式"

// 2.声明正则：RegExp，\\
var reg = new RegExp('test')

// 3.修饰符 i 忽略大小写 g：全局匹配 m：多行匹配

// 4.表达式 范围取值：[]，或：| 

// 5.元字符 \w === [0-9A-z_] \W === [^\w]
// \d === [0-9]  \D === [^\d]  \s === [\r\n\t\v\f]  \S === [^\s]
// \b 单词边界  \B 非单词边界  .可以匹配除回车和换行以外的所有的字符

// 6.量词 n+ === n{1,正无穷}
// n* === n{0,正无穷} 匹配0次和正无穷次
// n? === n{0,1}  n{x,y} y如果不填，就是x到正无穷
// ^n 匹配任何以n开头的字符串
// n$ 匹配任何以n结尾的字符串
// ?=n 匹配任何其后紧接着指定字符串n的字符串
// ?!n 匹配任何其后不是紧接着指定字符串n的字符串

// 7、子表达式 (n)

// 8、反向引用 \n 反向引用的第n个表达式 /(\w)\1\1\1/g