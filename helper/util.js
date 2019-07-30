const moment = require('moment');

function get24HoursDateRange(obj) {
    let currentMonth = moment().month();
    let startDate;
    let endDate;

    if (obj.start_date && obj.end_date) {
        startDate = obj.start_date;
        endDate = obj.end_date;
    } else {
        startDate = moment().toDate();
        endDate = moment().toDate();
    }

    return {
        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
        $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
    };
}
module.exports.get24HoursDateRange = get24HoursDateRange;