const globalData = {}

/**
 * 设置全局变量
 * @param key
 * @param val
 */
export function set (key: string, val: any) {
  globalData[key] = val
}

/**
 * 获取全局变量
 * @param key
 */
export function get (key: string) {
  return globalData[key]
}
