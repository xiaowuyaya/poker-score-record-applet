import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Notice extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='notice'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
