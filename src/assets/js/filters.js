export const filterTime =  (val) => {
            if (!val) return '';
            // 测试时间戳: 1495159106281 => 2017/5/19 9:58
            // 正式时间戳: new Date(val).getTime()
            let creaTime = new Date(val).getTime(),
                curTime = new Date().getTime(),
                $Date = new Date(val),
                year = $Date.getFullYear(),    // 年
                month = $Date.getMonth() + 1,  // 月
                date = $Date.getDate(),        // 日
                diffTime = curTime - creaTime,                // 毫秒差
                diffSecounds = Math.floor(diffTime / 1000),   // 秒差
                diffMinutes = Math.floor(diffSecounds / 60),  // 分钟差
                diffHours = Math.floor(diffMinutes / 60),     // 小时差
                diffDays = Math.floor(diffHours / 24);        // 天差
            
            if (diffMinutes === 0) {
                return diffSecounds + '秒前'
            }
            if (diffHours === 0) {
                return diffMinutes + '分钟前'
            }
            if (diffDays === 0) {
                return diffHours + '小时前'
            }
            if (diffDays > 0 && diffDays <= 20) {
                return diffDays + '天前'
            }
            if (diffDays > 20) {
                return year + '-' + month + '-' + date
            }
        }