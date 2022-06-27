import {View} from "@tarojs/components";

import './index.scss'

function Index() {
  return (
    <View className='footer-container'>
      &copy;{new Date().getFullYear()} XiaoWuYaYa All rights reserved.
    </View>
  )
}

export default Index
