/**
 * 用户信息
 */
declare interface IUserInfo {
  avatarUrl: string,
  nickName: string,
  province?: string,
  city?: string
  gender?: number,
}

/**
 * 首页对局数据
 */
declare interface IRecordData {
  totalNum: number,
  winNum: number,
  winRate: number
}

// 玩家信息
declare interface IPlayer {
  avatarUrl: string,
  nickName: string,
  score: number
}

// 交易信息
declare interface IDealRecord {
  payer: string,
  payee: string,
  score: number
}
