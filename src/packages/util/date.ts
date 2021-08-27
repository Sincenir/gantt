import { isDate, isNumber, isString } from "./base"



/**
 * 创建日期的工厂函数，生成一个指定日期，如果无效，返回当日日期
 * @param {String | Number | Date} date 日期
 */
export function createDate(date?: string | number | Date): Date {
  if (isString(date) || isNumber(date)) {
    return new Date(date as string | number);
  } else if (isDate(date)) {
    return date as Date;
  } else {
    return new Date();
  }
}


/**
 * 获取两个日期间的所有日期列表
 * @param {Date | String | Number} startDate
 * @param {Date | String | Number} endDate
 * @param {String} format
 */
export function getDateList(startDate: string | number | Date, endDate: string | number | Date, format = "yyyy-MM-dd"): Array<string> {
  const r = [];
  let startTime = createDate(startDate).getTime();
  let endTime = createDate(endDate).getTime();

  for (let i = startTime; i <= endTime;) {
    r.push(formatDate(i, format));
    i += 24 * 60 * 60 * 1000;
  }

  return r;
}

interface IDateFmt {
  'M+': any
  'd+': any
  'h+': any
  'H+': any
  'm+': any
  's+': any
  'q+': any
  'S': any
}

/**
 * 格式化时间
 * @param {Date | String | Number} date 日期对象，或一个日期字符串，对其进行格式化
 * @param {String} fmt 格式文本，y:年，q:季度，M:月，d:日，H:小时，m:分钟，s:秒，S:毫秒。例：`yyyy-MM-dd`
 * @return {String} 格式化的内容，
 */
export function formatDate(date: any = null, fmt = "yyyy-MM-dd") {
  if (!isDate(date)) {
    date = checkDate(date);
  }

  if (date === null) {
    date = createDate();
  }

  let o: IDateFmt = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k as keyof IDateFmt] : ("00" + o[k as keyof IDateFmt]).substr(("" + o[k as keyof IDateFmt]).length)
      );
  }

  return fmt;
}

/**
 * 检测给出了内容是否可以转成一个日期对象，如果可以，返回日期对象，如果不能，返回null
 * @param {Date | String | Number} date
 */
export function checkDate(date: any) {
  if (typeof date === "string" || typeof date === "number") {
    try {
      date = createDate(date);
    } catch (error) {
      date = null;
    }
  }
  return date;
}

/**
 * 获取两个时间的间隔时间戳
 * @param {String | Number | Date} startDate 起始日期
 * @param {String | Number | Date} endDate 截止日期
 */
 export function getDateInterval(startDate: string | number | Date, endDate: string | number | Date): number {
   const tmp = createDate(endDate).getTime() - createDate(startDate).getTime()
  return Number(tmp)
}

export function dateCalculate(date: string | number | Date, days: number) {
  date = createDate(date)
  console.log(days)
  return new Date(date.getTime() + (days * 86400000))
}
