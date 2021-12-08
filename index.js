const request = require("request-promise");
const cheerio = require("cheerio");

const tammsaareOffice = 'cmQszYWUMkS1QtgqEtJv7w'

const websiteUrl = `https://broneering.politsei.ee/MakeReservation/SelectTime?serviceId=H_GGs4WzRUW23mKUtDVIcA&branchId=${tammsaareOffice}`;
const monthName = 'December';

request(websiteUrl, (error, response, html) => {
    if (error) {
        console.log(`An error occured: ${error}`);        
    }
    if (response.statusCode !== 200) {
        console.log(`Unsuccesful request ${response.statusMessage}`);
    }

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
        for(const time of availableTimeSlots) {
            console.log(time);
        }
    }
    else {
        console.log('no available times');
    }
        
});