# Final Project for CS460

## About the Project
This project uses [VirusTotal's Public API v2.0](https://www.virustotal.com/en/documentation/public-api/) to retrieve scan reports of MD5 hashes. In particular, the [file scan report](https://www.virustotal.com/en/documentation/public-api/#getting-file-scans) endpoint is used to retrieve reports for up to 4 hashes per minute.

## How it Works
Upon submitting a number of MD5 hashes, `Scan` and `RequestItem` objects are created for each one. The `Scan` will contain the results of the VirusTotal API call, while the `RequestItem` objects are used to determine the order in which requests are made. A `Request` object is created as well, and it contains an array of ids of `Scan` objects associated with the submitted hashes.

A cron job runs every 16 seconds (to avoid going over the limit of 4 resources/minute) that picks the oldest `RequestItem` and sends the MD5 hash stored in it to VirusTotal. The associated `Scan` object is then updated with the response from the API.

In this way, `Request`s can be created and viewed without having all of the VirusTotal scan reports in the database. It is also possible to check for existing `Scan` objects to avoid making unnecessary API calls. 

## Requirements
- Node.js (and npm)
- Bower
- Grunt
- MongoDB

To install everything, run the following:
```
sudo apt-get update
sudo apt-get install -y git
curl https://raw.githubusercontent.com/creationix/nvm/v0.17.2/install.sh | bash
export NVM_DIR="/home/vagrant/.nvm" 
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 0.10.32
echo "nvm use 0.10" >> ~/.profile

npm install -g bower
npm install -g bower-installer
npm install -g grunt-cli

# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get install -y mongodb-org

source ~/.profile
```

## Running the Project
First, set up the app configuration. Find out how in [`app/config/default`](app/config/default).

Use the following commands to get this up and running:
```bash
npm install # installs backend dependencies
bower install # installs frontend dependencies
grunt sass # compiles .scss files to css
grunt uglify # minifies js
grunt
```

## File Structure
- `/` - project root
    + `app/` - app files, including routing, controllers, and models
        * `config/` - app config and settings (no files initially)
            - `default/` - default config and settings
        * `controllers/` - controllers for the api and web views
        * `models/` - mongoose models
        * `routes/` - all the routing is done here
    + `frontend/` - contains frontend files
        * `sass/` - sass files here will be compiled to `/public/css/`
        * `js/` - js files here will be minified and copied to `/public/js/`, AngularJS files are found here
    + `public/` - contains all files accessible to clients
        * `css/` - minified stylesheets
        * `js/` - minified javascript
        * `lib/` - bower install location
        * `partials/` - angular template partials
        * `index.html` - the app page
