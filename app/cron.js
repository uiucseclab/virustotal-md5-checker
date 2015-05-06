var cron = require('cron');
var httpRequest = require('superagent');
var CronJob = cron.CronJob;
var Request = require('./models').Request;
var RequestItem = require('./models').RequestItem;
var apiKey = require('./config/settings').apiKey;


var startTime = Date.now();

var job = new CronJob({
    cronTime: '*/16 * * * * *',
    onTick: function() {
        // runs every 16 seconds
        console.log('cron job tick: ' + new Date());

        Request
            .findOne({ isComplete: false })
            .sort({ dateAdded: 1 })
            .exec(function(err, request) {
                if (err) {
                    console.log(err);
                } else if (!request) {
                    console.log('Error: no request found');
                } else {
                    RequestItem
                        .find({ _id: { $in: request.items } })
                        .exec(function(err, requestitems) {
                            if (err) {
                                console.log(err);
                            } else {
                                var md5s = [];
                                requestitems.map(function(requestitem) { md5s.push(requestitem.md5); });
                                var requestBody = {
                                    apikey: apiKey,
                                    resource: md5s.join(', ')
                                };
                                console.log(requestBody);

                                return; // Remove this to make API calls

                                httpRequest
                                    .post('https://www.virustotal.com/vtapi/v2/file/report')
                                    .send(requestBody)
                                    .set('Accept', 'application/json')
                                    .end(function(err, res) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('VirusTotal API call successful');

                                            // Update requestitems, set "done" to true
                                            // Add new items to scans
                                            // Check if request is complete
                                        }
                                    });
                                // httpRequest
                            }
                        });
                    // RequestItem query
                }
            });
        // Request query
    },
    start: false
});

job.start();