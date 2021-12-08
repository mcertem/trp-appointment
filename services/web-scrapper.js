const request = require("request-promise");

exports.executeScrapper = async (websiteUrl, callback) => {

    request(websiteUrl, (error, response, html) => {
        if (error) {
            console.log(`An error occured: ${error}`);
            throw error;
        }
        if (response.statusCode !== 200) {
            console.log(`Unsuccesful request ${response.statusMessage}`);
            throw new Error('Unsuccesful request');
        }

        callback(html);          
    });
}