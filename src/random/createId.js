
/**
 * 随机生成dom
 * @memberof module:dom
 * @param {string} str 随机字符串拼接前缀（默认为dom-id）
 * @return {string} 返回拼接后的随机字符串
 * @example
 * createId()
 * // => "dom-id-89qs8tlrx8o"
 * createId('data-')
 * // => "data-34yc7i7h76f"
 */

export default function createId(str = 'dom-id-') {
    return str + Math.random().toString(36).substr(2)
}
