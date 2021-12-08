const { sentAvailableDatesNotificationMail, sentErrorNotificationMail } = require("../services/email-service");
const { executeScrapper } = require("../services/web-scrapper");

function sendMailAboutDates(dates) {
    if (dates?.length) {
        sentAvailableDatesNotificationMail(dates);
    }
}

exports.checkTrp = async () => {
    try {
        await executeScrapper(sendMailAboutDates);
    } catch (error) {
        console.log(error);
        sentErrorNotificationMail();        
    }
};