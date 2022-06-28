import Taro from '@tarojs/taro'
import {baseUrl} from "../config";


interface IOption {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any
}


export default async (options: IOption) => {
  let token

  try {
    token = await Taro.getStorage({key: 'TOKEN'})
  }catch (err){
    token = ""
  }

  return Taro.request({
    url: baseUrl + options.path,
    data: options.data,
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.data}`
    },
    method: options.method
  }).then((res) => {
    const {statusCode, data} = res
    if (statusCode >= 200 && statusCode < 300) {
      if (data.code != 0) {
        Taro.showToast({
          title: `resp code ${data.code},msg: ${data.msg}`,
          duration: 1500,
          icon: 'none',
          mask: false,
        });
      }
      return data.data;
    } else if(statusCode === 401){
      Taro.showToast({
        title: `登入凭证已过期，请退出重新登入`,
        duration: 1500,
        icon: 'none',
        mask: false,
      });
      Taro.removeStorage({key: 'TOKEN'})
    } else {
      Taro.showToast({
        title: `code ${statusCode} 请求失败，请重新尝试`,
        duration: 1500,
        icon: 'none',
        mask: false,
      });
    }
  })

}
