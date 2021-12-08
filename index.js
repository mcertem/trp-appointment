
const { sentAvailableDatesNotificationMail, sentErrorNotificationMail } = require("./services/email-service");
const { executeScrapper } = require("./services/web-scrapper");

function sendMailAboutDates(dates) {
    if (dates?.length) {
        sentAvailableDatesNotificationMail(dates);
    }
}

async function run() {
    try {
        await executeScrapper(sendMailAboutDates);
    } catch (error) {
        console.log(error);
        sentErrorNotificationMail();
    }
};

run();
