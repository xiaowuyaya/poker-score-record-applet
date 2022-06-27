import { useState } from "react";
import { View } from "@tarojs/components";

import './index.scss'

import Footer from "../../component/Footer";

function Index(){


  return (
    <View className='home-container'>
      {/* 用户面板 */}
      <View className='user-panel'>
        <View className='info'></View>
        <View className='data'></View>
      </View>


      {/* 页脚 */}
      <Footer></Footer>
    </View>
  )
}

export default Index
