import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.extend(calendar)

dayjs.locale('zh-cn')

/**
 *  1小时内使用过去时间；大于1小时~小于1天，转为日历时间；大于1天转为标准时间格式
 */
export function timeFormat(
  datetime: string | number,
  type: 'normal' | 'ago' | 'calendar' = 'normal'
) {
  const time =
    typeof datetime === 'number'
      ? Number.parseInt(datetime.toString().padEnd(13, '0'), 10)
      : Date.parse(datetime)

  if (type === 'ago') return dayjs(time).fromNow()
  if (type === 'calendar') return dayjs(time).calendar()
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
