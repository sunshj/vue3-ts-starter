import moment from 'moment'
import 'moment/dist/locale/zh-cn'

moment.locale('zh-CN')

/**
 *  1小时内使用过去时间；大于1小时~小于1天，转为日历时间；大于1天转为标准时间格式
 * @param {*} datetime
 * @returns
 */
export function timeFormat(datetime: string | number) {
  const time =
    typeof datetime === 'number'
      ? parseInt(datetime.toString().padEnd(13, '0'), 10)
      : Date.parse(datetime)

  const currentDiff = Date.now() - time
  if (currentDiff < 3600000) {
    return moment(time).fromNow()
  }
  if (currentDiff > 3600000 && currentDiff < 86400000) {
    return moment(time).calendar()
  }
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
