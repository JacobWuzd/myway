/*
 * @Author: your name
 * @Date: 2020-09-16 17:19:01
 * @LastEditTime: 2020-09-16 21:04:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \我的路线\我的路线code\算法\最小K个数.js
 */

// 1.利用Math.min来找出数组中最小的数
// 2.每找出一个最小的，就把它从这个数组中删掉，直到找出k个为止
function GetLeastNumbers_Solution(input, k)
{
  let len = input.length;
  if (len <= 0 || len < k) return [];
  let count = k;
  let sortArr = input.sort();
  let result = sortArr.slice(0, k);
  return result;
  /* let len = input.length;
  if (len <= 0 || len < k) return [];
  let count = k;
  let result = [];
  while(count > 0) {
    let item = Math.min(...input);
    result.push(item);
    input.splice(input.indexOf(item), 1)
    count--
  }
  return result; */
}
console.log(GetLeastNumbers_Solution([4,5,1,6,2,7,3,8], 10))