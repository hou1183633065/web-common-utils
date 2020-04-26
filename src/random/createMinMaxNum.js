/**
 * 
 * @desc 生成指定范围[min, max]的随机数
 * @param  {Number} min 最小值
 * @param  {Number} max 最大值
 * @return {Number} 
 */

export default function createMinMaxNum(min, max) {
    return Math.floor(Math.random() * (max-min+1) )+ min;
}
