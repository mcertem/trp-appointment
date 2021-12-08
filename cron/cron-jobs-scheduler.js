const cron = require('node-cron');
const { checkTrp } = require('./cron-jobs');

const EVERY_MINUTE = '* * * * *'
const tasks = { 'TRP': { period: EVERY_MINUTE, isRunning: false, task: null } };

exports.startTrpChecker = () => {    
    if (tasks['TRP'].isRunning) {        
        console.log('Already running');
        return;
    }

    if (tasks['TRP'].task) {
        tasks['TRP'].task.start();
    } else {
        tasks['TRP'].task = cron.schedule(tasks['TRP'].period, () => {
            try {
                checkTrp();
            } 
            catch {
                stopTrpChecker();
            }
        });
    }

    tasks['TRP'].isRunning = true;
}

stopTrpChecker = () => {
    if (!tasks['TRP'].isRunning) {        
        console.log('Already stopped');
        return;
    }
    tasks['TRP'].task.stop();
    tasks['TRP'].isRunning = false;

}