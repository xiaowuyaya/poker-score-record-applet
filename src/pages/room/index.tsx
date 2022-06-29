import {View, Image, ScrollView, Text} from '@tarojs/components'
import Taro, {useReady, useRouter} from "@tarojs/taro";
import {Button, Dialog, Divider, Popup} from '@antmjs/vantui';
import {useState} from "react";
import Footer from "../../component/Footer";
import * as api from '../../api/index'

import './index.scss'
import {icon} from '../../asset'

function Room() {
  const router = useRouter()

  /**
   * 退出游戏
   */
  async function quitGame() {
    Dialog.confirm({
      message: '是否结算并退出当前房间',
      selector: 'quit',
      width: '68%',
    }).then(choose => {
      // TODO: QUIT SERVICE
      if (choose === 'confirm') {
        console.log('quit')
      }
    })
  }

  useReady(async () => {
    // 取到路由参数
    const {id} = router.params as any
    setRoomNo(id)

    // 缓存房间号
    await Taro.setStorage({key: 'ROOM_NO', data: id})
    await Taro.setNavigationBarTitle({title: `房间号：${id}`})

    //  获取当前房间的二维码图片
    const QRCodeBase64 = await api.getRoomShareQRCode({roomNo: id})
    setQRCode(QRCodeBase64)

    //  TODO: ...

  })

  // 当前房间号
  const [roomNo, setRoomNo] = useState<number>(0);
  // 用户列表
  const [players, setPlayers] = useState<IPlayer[]>([
    {
      avatarUrl: icon.tea,
      nickName: "茶水",
      score: 0.0
    }, {
      avatarUrl: icon.tea,
      nickName: "茶水",
      score: 0.0
    }, {
      avatarUrl: icon.tea,
      nickName: "茶水",
      score: 0.0
    }, {
      avatarUrl: icon.tea,
      nickName: "茶水",
      score: 0.0
    }, {
      avatarUrl: icon.tea,
      nickName: "茶水",
      score: 0.0
    }
  ]);
  // 交易记录
  const [dealRecord, setDealRecord] = useState<IDealRecord[]>([
    {
      payer: "张三",
      payee: "李四",
      score: 12.3
    },
    {
      payer: "张三",
      payee: "李四",
      score: 12.3
    }, {
      payer: "张三",
      payee: "李四",
      score: 12.3
    },
    {
      payer: "张三",
      payee: "李四",
      score: 12.3
    }, {
      payer: "张三",
      payee: "李四",
      score: 12.3
    }, {
      payer: "张三",
      payee: "李四",
      score: 12.3
    },

  ]);
  // 房间二维码 base64
  const [QRCode, setQRCode] = useState<string>("");
  // 是否显示房间二维码
  const [showQRCodeW, setShowQRCodeW] = useState<boolean>(false);
  // 是否显示交易窗口
  const [showDealW, setShowDealW] = useState<boolean>(false);
  // 是否显示结算退出窗口
  const [showQuitW, setShowQuitW] = useState<boolean>(false);

  return (
    <View className='room-container'>
      {/* 玩家列表 */}
      <View className='players'>
        {
          players.map((item, idx) => (
            <View key={idx} className='player-cell'>
              <Image src={item.avatarUrl} mode='scaleToFill' />
              <View className='player-name'>{item.nickName}</View>
              <View className='player-score'>￥{item.score}</View>
            </View>
          ))
        }
      </View>

      {/* 交易面板 */}
      <View className='deal-panel'>
        <View className='title'>当前房间号：{roomNo}</View>
        {/* 交易信息 */}
        <ScrollView className='scrollview' scrollY showScrollbar>
          {
            dealRecord.map((item, idx) => (
              <View className='deal-row' key={idx}>
                <Text className='player-name'>{item.payer}</Text>
                <Text>丢给了</Text>
                <Text className='player-name'>{item.payee}</Text>
                <Text className='score'>{item.score}</Text>
                <Text>个硬币</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>

      {/* 按钮区 */}
      <View className='btn-panel'>
        <Button color='#07c160' onClick={() => {
          setShowQRCodeW(true)
        }}
        >邀请好友</Button>
        <Button color='#d54d52' onClick={async () => {
          await quitGame()
        }}
        >结算退出</Button>
        <Button color='#4267b2'>使用教程</Button>
      </View>

      {/* 退出游戏 确认框*/}
      <Dialog id='quit' />

      {/* 分享窗口 */}
      <Popup className='share-popup' round show={showQRCodeW} onClose={() => setShowQRCodeW(false)}>
        <View className='title'>房间号：{roomNo}</View>
        <View className='divider'>
          <Divider contentPosition='center'>扫码加入房间</Divider>
        </View>
        <Image src={QRCode} />
      </Popup>

      {/* 页脚 */}
      <Footer></Footer>
    </View>
  )
}

export default Room
