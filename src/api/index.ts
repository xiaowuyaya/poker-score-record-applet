import request from "../utils/request";

/**
 * 授权登入
 */
export const authLogin = data =>{
  return request({
    path:'/user/authLogin.do',
    method: 'POST',
    data
  })
}

/**
 * 通过id查找用户信息
 * @param data
 */
export const findUserById = data =>{
  return request({
    path:'/user/findUserById.do',
    method: 'GET',
    data
  })
}

/**
 * 获取对局统计
 */
export const getRecordData = () =>{
  return request({
    path:'/record/getRecordData.do',
    method: 'GET',
  })
}

/**
 * 获取对局数据详情
 */
export const getRecordDataDetail = () =>{
  return request({
    path:'/record/getRecordDataDetail.do',
    method: 'GET',
  })
}
