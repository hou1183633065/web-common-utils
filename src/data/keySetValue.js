/**
 * 在对象中根据键将值插入到数组中（前端列表展示，接口返回一个数据对象时使用）
 * @memberof module:data
 * @param {Array} origin_array 插值/展示列表数组
 * @param {Object} origin_object 取值对象
 * @param {Array} key_array 插入时依据的多个键,默认为key
 * @param {Array} value_array 插入多个键时赋值所需的键,默认为value
 * @return {Array} 返回依据键值对在对象中取值后的数组
 * @example
 * let arr = [{key: 'key1',value: ''},{key: 'key2',value: ''}]
 * let obj = {key1: 123, key2: 456}
 * keySetValue(arr, obj)
 * // => [{key: 'key1',value: '123'},{key: 'key2',value: '456'}]
 */
export default function keySetValue(origin_array = [], origin_object = {}, key_array = ['key'], value_array = ['value']) {
    if (JSON.stringify(origin_object) === '{}') return origin_array
    return origin_array.map((item) => {
        key_array.forEach((ele, index) => {

            if (origin_object.hasOwnProperty(item[ele])) {

                const resultValue = origin_object[item[ele]]
                item[value_array[index]] = resultValue === null || resultValue === undefined ? '' : resultValue.toString()
            }
        })
        return item
    })
}