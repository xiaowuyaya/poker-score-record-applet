import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Tutorial extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='tutorial'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
