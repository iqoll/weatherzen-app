export const weekDayNames: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const monthNames: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Des'
]

/**
 * 
 * @param dateUnix Unix date in seconds
 * @param timezone Timezone shift from UTC in seconds
 * @returns Date string. format: 'Sunday 10, Jan' 
 */

export const getDate: Function = (dateUnix: number, timezone: number) => {
  const date: Date = new Date((dateUnix + timezone) * 1000)
  const weekDayName: string = weekDayNames[date.getUTCDay()]
  const monthName: string = monthNames[date.getUTCMonth()] 
  
  return `${weekDayName} ${date.getUTCDate()}, ${monthName}`
}

/**
 * 
 * @param timeUnix Unix date in seconds
 * @param timezone Timezone shift from UTC in seconds
 * @returns Time string. format: '12:00 AM' 'HH:MM AM/PM'
 */

export const getTime: Function = (timeUnix: number, timezone: number) => {
  const date: Date = new Date((timeUnix + timezone) * 1000)
  const hours: number = date.getUTCHours()
  const minutes: number = date.getUTCMinutes()
  const period: string = hours >= 12 ? 'PM' : 'AM'
  
  return `${hours % 12 || 12}:${minutes} ${period}`
}

export const aqiText = {
  1: {
    level: 'Good',
    message: 'Air quality is considered satisfactory, and air pollution poses little or no risk'
  },
  2: {
    level: 'Fair',
    message: 'Air quality is acceptable, may be a moderate health concern for a number of people'
  },
  3: {
    level: 'Moderate',
    message: 'Members of sensitive group may be affected. The general public is likely not affected'
  },
  4: {
    level: 'Poor',
    message: 'The general public may experience health effects. For a number of people may experience more serious effects'
  },
  5: {
    level: 'Very Poor',
    message: 'Entire population is likely to be affected. Health warning of emergency conditions'
  }
}