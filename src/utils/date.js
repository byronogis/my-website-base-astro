import dayjs from 'dayjs'

// 默认时间格式 ‘YYYY-MM-DD’
export const formatData = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
