
/* 后端API地址 */
console.log(process.env.NODE_ENV)
export const baseUrl: string = process.env.NODE_ENV === 'development' ? 'http://localhost:7001/v1' : 'https://wx.eiko.ren'
