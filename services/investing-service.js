const cheerio = require('cheerio');
const { executeScrapper } = require("./web-scrapper");
const { showSimpleMessage }  = require("./desktop-notifier-service");
const { sentErrorNotificationMail, sentHtmlBodyNotificationMail }  = require("./email-service");

const websiteUrl = 'https://www.investing.com/equities/interprivate-acquisition';

function getStockPrice(html) {
    const $ = cheerio.load(html);
    const priceElement = $("main > div > div > div:nth-child(2) > div > span");
    /// const a = instrument.children('div');
    const price = Number($(priceElement).text());
    return price;
}


function analyzeStockPrice(html) {
    const threshold = 9.70;
    const price = getStockPrice(html);
    if (price > threshold) {
        showSimpleMessage('Zengin Olduk', `Fiyat coştu reyis: ${price}`);
    }    
}

exports.checkAevaStockPrice = async () => {
    try {
        executeScrapper(websiteUrl, analyzeStockPrice);
    }
    catch (error) {
        console.log(error);
        sentErrorNotificationMail();
    }
};