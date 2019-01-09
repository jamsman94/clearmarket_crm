// 委托单状态
export const wtdState = state => {
  switch (+state) {
    case 0:
      return '已拒绝(ErrorStart)'
    case 1:
      return '已拒绝(ErrorPlaced)'
    case 2:
      return '已拒绝(PlacedOutOfDate)'
    case 3:
      return '待成交(New)'
    case 4:
      return '待成交(Booked)'
    case 5:
      return '已成交'
    case 6:
      return '待成交(ParFilled)'
    case 7:
      return '部分成交，剩下的取消'
    case 8:
      return '已取消'
    case 9:
      return '类型错误'
    case 10:
      return '资金不足(ExeParInsufficient)'
    case 11:
      return '资金不足(ExeInsufficient)'
    case 12:
      return '部分成交，部分取消'
    case 13:
      return '强制平仓'
    case 14:
      return '已取消(SynEol)'
    case 15:
      return 'NA'
  }
}
