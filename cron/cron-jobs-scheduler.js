const cron = require('node-cron');
const { checkTrp } = require('../services/trp-service');

const EVERY_MINUTE = '* * * * *'

// To add new cron-jobs:
// just add job definitions to the jobs array as a new object.
// And define callback function in other file
// Finally call startJob from index.js
const jobs = { 'TRP': { period: EVERY_MINUTE, isRunning: false, task: null, callback: checkTrp } };


exports.startJob = (jobName) => {    
    if (!validateStartingJob(jobName)) {
        return;
    }
    
    const job = jobs[jobName];

    if (job.task) {
        job.task.start();
    } else {
        job.task = cron.schedule(job.period, () => {
            try {
                job.callback();
            } 
            catch {
                stopJob(job);
            }
        });
    }

    job.isRunning = true;
}

const stopJob = (job) => {
    if (!job.isRunning) {        
        console.log(`${job.jobName} already stopped`);
        return;
    }
    job.task.stop();
    job.isRunning = false;

}

const validateStartingJob = (jobName) => {
    let isValid = true;

    if (jobs[jobName]) {
        console.log(`There is no task with "${jobName}" name`);
        isValid = false;
    }
    
    else if (jobs[jobName].isRunning) {        
        console.log('Already running');
        isValid = false;
    }

    return isValid;
}