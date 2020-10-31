
export const moment = function moment(context){
      console.log(context)
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let month = day * 30;
      let now = new Date().getTime();
      function getDateDiff(dateTimeStamp,context) {
		  let result;
        console.log(dateTimeStamp);
        let diffValue = now - dateTimeStamp;
        console.log(new Date(dateTimeStamp).toLocaleDateString())
        console.log(diffValue)
        if (diffValue < 0) {
          result = new Date(dateTimeStamp).toLocaleDateString();
        }
        let yearComment = diffValue /(month * 12)
        let monthComment = diffValue / month;
        let weekComment = diffValue / (7 * day);
        let dayComment = diffValue / day;
        let hourComment = diffValue / hour;
        let minComment = diffValue / minute;
        //console.log(yearComment);
        if(yearComment >= 1){
          // result = parseInt(yearComment) + "年前";
          result = context.substring(0,10)
        } else if (monthComment < 4 && monthComment >= 1) {
          // result = parseInt(monthComment) + "个月前";
          result = context.substring(0,10)
        } else if (weekComment >= 1) {
          // result = parseInt(weekComment) + "周前";
          result = context.substring(0,10)
        } else if (dayComment<=3&&dayComment >= 1) {
          result = parseInt(dayComment) + "天前";
        }
		else if (dayComment >3) {
          // result = parseInt(dayComment) + "天前";
          result = context.substring(0,10)
        } else if (hourComment >= 1) {
          result = parseInt(hourComment) + "小时前";
        } else if (minComment >= 1) {
          result = parseInt(minComment) + "分钟前";
        } else if(minComment < 0){
            result = "还未发生"
        } else{
          result = "刚刚";
		}
        return result;
      }
      return getDateDiff(Date.parse(new Date(context)),context)
    }