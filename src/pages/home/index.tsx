import {useState} from "react";
import {View} from "@tarojs/components";
import {Button, Popup} from '@antmjs/vantui'
import Taro from "@tarojs/taro";
import * as api from '../../api/index'

import './index.scss'
import Footer from "../../component/Footer";

/**
 * 授权登入
 */
async function authLogin() {
  try{
    const {encryptedData, iv, signature} = await Taro.getUserProfile({
      desc: '获取您的基本信息用于程序显示',
    })
    const { code } = await Taro.login()
    const userInfo = await api.authLogin({ code, encryptedData, iv, signature })
    // 判断是否获取到用户的解密数据， 获取成功则写入缓存中并重启应用
    if (userInfo){
      await Taro.setStorage({
        key: "USER_INFO",
        data: userInfo,
      });
      await Taro.showToast({
        title: `授权登入成功`,
        icon: 'none',
        duration: 1500,
        mask: false
      })
      setTimeout(()=>{
        Taro.reLaunch({url: './index'})
      },1500)
    }else {
      await Taro.showToast({
        title: `授权登入失败，请重新尝试`,
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    }
  }catch (err){
    console.log(`authLogin fail: ${err}`)
  }
}

function Index() {

  // 展示授权登入框
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(true);

  return (
    <View className='home-container'>
      {/* 授权登入框 */}
      <Popup
        className='login-popup'
        show={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      >
        <View className='login-title'>登入或注册</View>
        <Button className='login-btn' icon='wechat' color='#07c160' square block onClick={() => {
          authLogin()
        }}
        >微信账号快速登入</Button>
        <View className='login-desc'>点击按钮授权您的基本信息（头像，微信名等）</View>
      </Popup>

      {/* 用户面板 */}
      <View className='user-panel'>
        <View className='info'></View>
        <View className='data'></View>
      </View>
      <Button type='primary' onClick={() => {
        // setShowLoginPopup(true)
        console.log(Taro.getEnv());
      }}
      >按钮文案</Button>
      {/* 页脚 */}
      <Footer></Footer>
    </View>
  )
}

export default Index
