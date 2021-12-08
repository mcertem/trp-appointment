const request = require("request-promise");
const cheerio = require("cheerio");

const tammsaareOffice = 'cmQszYWUMkS1QtgqEtJv7w'

const websiteUrl = `https://broneering.politsei.ee/MakeReservation/SelectTime?serviceId=H_GGs4WzRUW23mKUtDVIcA&branchId=${tammsaareOffice}`;
//const websiteUrl = 'https://broneering.politsei.ee/MakeReservation/SelectTime?serviceId=H_GGs4WzRUW23mKUtDVIcA&branchId=6O1xvgq0sUCoTQ-Yu1b28A&selectedMonth=P1yFwA#monthSelector'
const monthName = 'December';

exports.executeScrapper = async (callback) => {

    request(websiteUrl, (error, response, html) => {
        if (error) {
            console.log(`An error occured: ${error}`);
            throw error;
        }
        if (response.statusCode !== 200) {
            console.log(`Unsuccesful request ${response.statusMessage}`);
            throw new Error('Unsuccesful request');
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
        callback(availableTimeSlots);            
    });
}