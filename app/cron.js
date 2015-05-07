var cron = require('cron');
var httpRequest = require('superagent');
var CronJob = cron.CronJob;
var models = require('./models');
var RequestItem = models.RequestItem;
var Scan = models.Scan;
var settings = require('./config/settings');
var apiKey = settings.apiKey;


var startTime = Date.now();

var job = new CronJob({
    cronTime: '*/16 * * * * *',
    onTick: function() {
        // runs every 16 seconds
        console.log('cron job tick: ' + new Date());

        if (!settings.makeApiCalls)
            return;

        RequestItem
            .findOne()
            .sort({ dateAdded: 1 })
            .exec(function(err, requestitem) {
                if (err) {
                    console.log(err);
                } else if (!requestitem) {
                    console.log('No requestitems to be sent');
                } else {
                    console.log('Making API request');
                    httpRequest
                        .post('https://www.virustotal.com/vtapi/v2/file/report')
                        .send('apikey=' + apiKey)
                        .send('resource=' + requestitem.md5)
                        .end(function(err, res) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('VirusTotal API call successful');
                                console.log(res.body);

                                if (res.response_code < 0) {
                                    console.log('VirusTotal error');
                                    return;
                                }

                                var results = [{
                                    vendor: 'Not in VirusTotal database.',
                                    result: ''
                                }];

                                if (res.body.response_code === 1) {
                                    results = (function() {
                                        var vendors = Object.keys(res.body.scans);
                                        var ret = [];
                                        for (var i = 0; i < vendors.length; i++) {
                                            ret.push({
                                                vendor: vendors[i],
                                                result: res.body.scans[vendors[i]].result
                                            });
                                        }
                                        return ret;
                                    })();
                                }

                                var newScan = {
                                    md5: requestitem.md5,
                                    positives: res.body.positives,
                                    total: res.body.total,
                                    results: results
                                };

                                Scan.create(newScan, function(err, scan) {
                                    if (err) {
                                        console.log('Error creating scan');
                                    } else {
                                        console.log('Successfully created scan');
                                        requestitem.remove(function(err) {
                                            if (err) console.log('Error removing requestitem');
                                            else console.log('Successfully removed requestitem');
                                        });
                                    }
                                });
                            }
                        });
                    // httpRequest
                }
            });
        // RequestItem query
    },
    start: false
});

job.start();