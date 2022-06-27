import request from "../utils/request";

/**
 * 授权登入
 */
export const authLogin = data =>{
  return request({
    path:'/wx/login',
    method: 'POST',
    data
  })
}
