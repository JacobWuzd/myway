/*
 * @Author: your name
 * @Date: 2020-09-16 23:59:53
 * @LastEditTime: 2020-09-20 21:18:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \我的路线\我的路线code\JS篇\正则\demo.js
 */
// 匹配一个手机号码
let isMobile = /^1[3|4|5|7|8|9][\d]{9}$/g;

// 匹配座机
let isTel = /^([/d]{3,4})-([/d]{6,8})$/g;

// 身份证
let isIdCard = /(^[0-9]{18}$)|(^[0-9]{17}X$)/g;

// xxyyzz -> XxYyZz
let str = 'xxyyzz'
let reg = /(\w)\1(\w)\2(\w)\3/g
str.replace(reg, function($, $1, $2, $3) {
  return $1.toUpperCase() + $1 +  $2.toUpperCase() + $2 + $3.toUpperCase() + $3
})

// 字符串去重
let reg1 = /(\w)\1*/g
str.replace(reg1, '$1')

// 金额位数分隔
let str1 = '1000000000000'
let reg2 = /(?=(\B)(\d{3})+$)/g
console.log(str1.replace(reg2, ','))

// 去掉输入空格
let reg3 = /^(\s+)(.*?)(\s+)$/;
let str2 = '  464646  ';
console.log(str2.replace(reg3, '$2'))

// 验证6位以上，包含数字、大写字母、小写字母和一个特殊字符
let reg4 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*~·!])/g
let pass = '1WW355463r1das#'
console.log(reg4.test(pass))