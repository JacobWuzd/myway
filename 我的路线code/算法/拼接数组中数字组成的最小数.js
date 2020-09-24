/*
 * @Author: your name
 * @Date: 2020-09-16 21:21:20
 * @LastEditTime: 2020-09-17 00:15:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \我的路线\我的路线code\算法\拼接数组中数字组成的最小数.js
 */
function PrintMinNumber(numbers)
{
    // write code here
  const LEN = numbers.length;
  if (LEN == 0) {
    return '';
  }
  if (LEN == 1) {
    return numbers[0];
  }
  for (let i = 0; i < LEN - 1; i++) {
    for (let j = i + 1; j < LEN; j++) {
      let num1 = parseInt(numbers[i].toString() + numbers[j].toString());
      let num2 = parseInt(numbers[j].toString() + numbers[i].toString());
      if (num1 > num2) {
        let temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
      }
    }
  }
  return numbers.join('');
}
console.log(PrintMinNumber([3, 32, 321]))
