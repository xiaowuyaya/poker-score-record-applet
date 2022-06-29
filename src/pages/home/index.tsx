import {useState} from "react";
import {View, Image} from "@tarojs/components";
import {Button, Popup, CellGroup, Cell, Dialog, Field, Divider} from '@antmjs/vantui'
import Taro, {useDidShow, useReady} from "@tarojs/taro";
import * as api from '../../api/index'
import {icon} from '../../asset'

import './index.scss'
import Footer from "../../component/Footer";

function Home() {

  /**
   * 授权登入
   */
  async function authLogin() {
    try {
      const {encryptedData, iv, signature} = await Taro.getUserProfile({
        desc: '获取您的基本信息用于程序显示',
      })
      const {code} = await Taro.login()
      const {userInfo, token} = await api.authLogin({code, encryptedData, iv, signature})

      // 判断是否获取到用户信息以及token， 获取成功则写入缓存中并重启应用
      if (userInfo && token) {
        await Taro.setStorage({
          key: "USER_INFO",
          data: userInfo,
        });

        await Taro.setStorage({
          key: "TOKEN",
          data: token,
        });

        await Taro.showToast({
          title: `授权登入成功`,
          icon: 'none',
          duration: 1500,
          mask: false
        })
        setTimeout(() => {
          Taro.reLaunch({url: './index'})
        }, 1500)
      } else {
        await Taro.showToast({
          title: `授权登入失败，请重新尝试`,
          icon: 'none',
          duration: 2000,
          mask: false,
        })
      }
    } catch (err) {
      console.log(`authLogin fail: ${err.message}`)
    }
  }

  /**
   * 退出登入
   */
  function logout() {
    Dialog.confirm({
      title: "退出登入",
      message: '是否确定退出当前账号',
      selector: 'logoutDialog',
      width: '68%',
    }).then(choose => {
      if (choose === 'confirm') {
        // 清空缓存
        Taro.clearStorage()
        setUserInfo({
          avatarUrl: 'http://qiniu.eiko.ren/img/markdown/default_avatar.jpg',
          nickName: '点击此处授权登入',
        })
        setIsLogin(false)
        setRecordData({
          winNum: 0,
          winRate: 0.00,
          totalNum: 0
        })
      }
    })
  }

  /**
   * 创建房间
   */
  async function createRoom() {
    Taro.navigateTo({url: `/pages/room/index?id=123`})
  }

  function joinRoom(type?: string) {
    // 手动加入
    if (!type){

    }
  }

  // 登入状态
  const [isLogin, setIsLogin] = useState<boolean>(false);
  // 用户基本信息
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    avatarUrl: 'http://qiniu.eiko.ren/img/markdown/default_avatar.jpg',
    nickName: '点击此处授权登入',
  });
  // 简洁对局数据
  const [recordData, setRecordData] = useState<IRecordData>({
    winNum: 0,
    winRate: 0.00,
    totalNum: 0
  });
  // 展示授权登入框
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  // 展示加入房间窗口
  const [showJoinRoomW, setShowJoinRoomW] = useState<boolean>(false);
  // 加入房间输入框
  const [roomNoInput, setRoomNoInput] = useState<number>();
  // 是否禁用加入房间输入框
  const [disableInput, setDisableInput] = useState<boolean>(true);

  useReady(async () => {
    // 判断是否已经授权登入
    try {
      const TOKEN = await Taro.getStorage({key: 'TOKEN'})
      const USER_INFO = await Taro.getStorage({key: 'USER_INFO'})
      if (USER_INFO || TOKEN) {
        setUserInfo({
          avatarUrl: USER_INFO.data.avatarUrl,
          nickName: USER_INFO.data.nickName
        })
        setIsLogin(true)
      }
    } catch (err) {
      console.log(`ready fail: ${JSON.stringify(err)}`)
    }
  })

  useDidShow(async () => {
    if (isLogin) {
      const recordRes = await api.getRecordData()
      setRecordData(recordRes)
    }
  })

  return (
    <View className='home-container'>
      {/* 用户面板 */}
      <View className='user-panel'>
        {/* 用户信息 */}
        <View className='user-info'>
          <Image className='avatar-img' src={userInfo.avatarUrl} onClick={() => {
            if (!isLogin) setShowLoginPopup(true)
          }}
          ></Image>
          <View className='nick-name' onClick={() => {
            if (!isLogin) setShowLoginPopup(true)
          }}
          >{userInfo.nickName}</View>
          {/*<View className='record-btn'>历史战绩</View>*/}
        </View>
        {/* 战绩数据 */}
        <View className='record-data'>
          {/* 胜场数据 */}
          <View className='record-box'>
            <View className='num'>{recordData.totalNum}</View>
            <View className='title'>场次</View>
          </View>
          {/* 胜率数据 */}
          <View className='record-box'>
            <View className='num'>{recordData.winRate}%</View>
            <View className='title'>胜率</View>
          </View>
        </View>
      </View>

      {/* 功能单元 */}
      <View className='menu-cell'>
        {/* 创建房间 */}
        <View className='cell-box' onClick={async () => {
          await createRoom()
        }}
        >
          <View className='cell-icon'>
            <Image src={icon.createRoom}></Image>
          </View>
          <View className='cell-text'>创建房间</View>
        </View>

        {/* 加入房间 */}
        <View className='cell-box' onClick={() => {
          setShowJoinRoomW(true)
        }}
        >
          <View className='cell-icon'>
            <Image src={icon.joinRoom}></Image>
          </View>
          <View className='cell-text'>加入房间</View>
        </View>

        {/* 公告通知 */}
        <View className='cell-box' onClick={() => {
          Taro.navigateTo({url: '/pages/notice/index'})
        }}
        >
          <View className='cell-icon'>
            <Image src={icon.notice}></Image>
          </View>
          <View className='cell-text'>公告通知</View>
        </View>

        {/* 分享 */}
        <View className='cell-box'>
          <View className='cell-icon'>
            <Image src={icon.share}></Image>
          </View>
          <View className='cell-text'>分享</View>
        </View>
      </View>

      {/* 菜单 */}
      <View className='menu'>
        <CellGroup border={false}>
          <Cell title='如何使用' isLink url='/pages/tutorial/index' />
          {/* TODO: 完成联系客服内容 */}
          <Cell title='联系我们' isLink border={false} />
        </CellGroup>
      </View>

      {/* 退出登入 */}
      <Dialog id='logoutDialog' />
      {isLogin
        ? <View className='logout' onClick={logout}>退出登入</View>
        : <View></View>
      }

      {/* 授权登入框 */}
      <Popup
        className='login-popup'
        show={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      >
        <View className='login-title'>登入或注册</View>
        <Button className='login-btn' icon='wechat' color='#07c160' square block onClick={async () => {
          await authLogin()
        }}
        >微信账号快速登入</Button>
        <View className='login-desc'>点击按钮授权您的基本信息（头像，微信名等）</View>
      </Popup>

      {/* 加入房间窗口 */}
      <Popup
        className='join-room-popup'
        round
        show={showJoinRoomW}
        onClose={() => setShowJoinRoomW(false)}
      >
        <View className='title'>加入房间</View>
        <Field
          value={roomNoInput}
          placeholder='请输入6位房间号'
          border={false}
          label='房间号'
          titleWidth='60px'
          maxlength={6}
          onChange={(e) => {
            setRoomNoInput(e.detail)
            setDisableInput(e.detail.length !== 6)
          }}
        />
        <Button className='btn'  square block disabled={disableInput} color='#f56c6c' onClick={() => joinRoom()} >加入房间</Button>
        <View className='divider'>
          <Divider contentPosition='center'>或者</Divider>
        </View>
        <Button className='btn'  square block icon='scan' color='#5ac725' onClick={() => joinRoom('QRCode')} >扫码加入房间</Button>
      </Popup>

      {/* 页脚 */}
      <Footer></Footer>
    </View>
  )
}

export default Home
