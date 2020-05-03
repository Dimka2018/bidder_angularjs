(function () {
   angular.module("routeApp").filter("dateFilter", () => {
       return (date) => {
           let day = date.day > 9 ? date.day : "0" + date.day;
           let month = date.month > 9 ? date.month : "0" + date.month;
           let year = date.year % 2000;
           let hour = date.hour > 9 ? date.hour : "0" + date.hour;
           let min = date.min > 9 ? date.min : "0" + date.min;
           let sec = date.sec > 9 ? date.sec : "0" + date.sec;
           return day + "\\" + month + "\\" + year + " " + hour + ":" + min + ":" + sec;
       }
   });
}());
