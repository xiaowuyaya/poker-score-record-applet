import Taro from '@tarojs/taro'
import {baseUrl} from "../config";

interface IOption {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any
}

export default (options: IOption) => {
  return Taro.request({
    url: baseUrl + options.path,
    data: options.data,
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method
  }).then((res) => {
    const { statusCode, data } = res
    if(statusCode >= 200 && statusCode < 300){
      if(data.code != 200){
        Taro.showToast({
          title: `code ${data.code} msg: ${data.msg}`,
          duration: 1500,
          icon: 'none',
          mask: false,
        });
      }
      return data.data;
    }else {
      Taro.showToast({
        title: `code ${statusCode} 请求失败，请重新尝试`,
        duration: 1500,
        icon: 'none',
        mask: false,
      });
    }
  })
}
