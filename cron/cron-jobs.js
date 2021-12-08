const { showSimpleMessage } = require("../services/desktop-notifier-service");
const { sentAvailableDatesNotificationMail, sentErrorNotificationMail } = require("../services/email-service");
const { executeScrapper } = require("../services/trp-scrapper");

function sendMailAboutDates(dates) {
    if (dates?.length) {
        sentAvailableDatesNotificationMail(dates);
        showSimpleMessage('Acele Et', 'Uygun Tarihler Var');
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