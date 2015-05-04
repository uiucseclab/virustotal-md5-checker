var cron = require('cron');
var CronJob = cron.CronJob;


var job = new CronJob({
    cronTime: '*/16 * * * * *',
    onTick: function() {
        // runs every 16 seconds
        console.log('cron job tick: ' + new Date());
    },
    start: false
});

job.start();