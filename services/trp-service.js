const cheerio = require('cheerio');
const { executeScrapper } = require("./web-scrapper");
const { showSimpleMessage }  = require("./desktop-notifier-service");
const { sentErrorNotificationMail, sentHtmlBodyNotificationMail }  = require("./email-service");


const tammsaareOffice = 'cmQszYWUMkS1QtgqEtJv7w';
const websiteUrl = `https://broneering.politsei.ee/MakeReservation/SelectTime?serviceId=H_GGs4WzRUW23mKUtDVIcA&branchId=${tammsaareOffice}`;
//const websiteUrl = 'https://broneering.politsei.ee/MakeReservation/SelectTime?serviceId=H_GGs4WzRUW23mKUtDVIcA&branchId=6O1xvgq0sUCoTQ-Yu1b28A&selectedMonth=P1yFwA#monthSelector'
const monthName = 'December';

function findAvailableTimes(html) {
    const $ = cheerio.load(html);
    const days = $(".day.clickable");
    availableTimeSlots = [];
    days.each((i, data) => {
        const dayOrder = $(data).text();
        const timeArray = JSON.parse($(data).attr("data-json"));
        for (let i = 0; i < timeArray.length; i++) {
            availableTimeSlots.push(dayOrder + ' ' + monthName + ' at ' + timeArray[i].text);
        }
    });

    if (availableTimeSlots.length) {
        const mailSubject = 'TRP takvimde uygun tarih';
        const mailBodyHtml = '<h1>ACELE ET</h1><p>Takvimde boşluk oluştu!</p>';
        for (const datetime of availableTimeSlots) {
            mailBodyHtml += `<p>${datetime}</p>`;
        }
        sentHtmlBodyNotificationMail(mailSubject, mailBodyHtml);
        showSimpleMessage('Acele Et', 'Uygun Tarihler Var');
    }
};

exports.checkTrp = async () => {
    try {
        executeScrapper(websiteUrl, findAvailableTimes);
    }
    catch (error) {
        console.log(error);
        sentErrorNotificationMail();
    }
};
