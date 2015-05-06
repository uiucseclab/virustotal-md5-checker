# Final Project for CS460

## About the Project
This project uses [VirusTotal's Public API v2.0](https://www.virustotal.com/en/documentation/public-api/) to retrieve scan reports of md5 hashes. In particular, the [file scan report](https://www.virustotal.com/en/documentation/public-api/#getting-file-scans) endpoint is used to retrieve reports for up to 25 hashes at a time.

[//]: # (TODO: add more detailed explanation of purpose, implementation, and usage)

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
