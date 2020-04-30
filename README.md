## Project for Software Architecture class - lyricsbar

built using online resources and tutorials

NodeJS web application using the Expressjs
Code is written in JavaScript

### App Server Config

Create an Ubuntu 18.04.3 LTS Server

update packages:
    `sudo apt update`
    `sudo apt upgrade -y`

in order to get latest stable release of nodejs first run

    `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`

Install NodeJS: 
    `sudo apt install nodejs`

check versions
    `node -v` (should be v12.something)
    `npm -v` (should be 6.something)

### Database Server Configuration

Create an Ubuntu 18.04.3 LTS Server

update packages:
    `sudo apt update`
    `sudo apt upgrade -y`

install mongodb:
	`sudo apt install mongodb -y`

check status of mongodb (should be active-running):
	`sudo systemctl status mongodb`

verify connection with diagnostic command (gives you version and address:port):
	`mongo --eval 'db.runCommand({ connectionStatus: 1 })'`

change mongodb config file to listen for ur app server:
    `sudo nano /etc/mongodb.conf`
    change bind_ip from 127.0.0.1 to 0.0.0.0
    (prolly not secure for production)

save and exit .conf file, restart mongodb:
	`sudo systemctl restart mongodb`

### App Setup Instructions:

clone this repository in app server
    `git clone https://github.com/davidbrekke/lyricsbar-phase2.git'

go to project folder:
    `cd lyricsbar-phase2`

initialize node:
    `npm init`
    change index.js to app.js, everything else is fine

install dependencies:
    `sudo npm i express express-session morgan passport passport-local body-parser ejs express-ejs-layouts bcrypt-nodejs cookie-parser dotenv mongoose --save`

install dev dependencies:
    `sudo npm i -D nodemon --save`

create .env file in project root and update with ur server info
    `port=3000`
    `db_ip=<YOUR_SERVER_IP>`

create .gitignore file and add the following:
    .env
    /node_modules
    package.json
    package-lock.json

### App Startup Instructions:

open package.json, under "scripts" delete the test script and paste in:
    "start": "node app.js",
    "dev": "nodemon app.js"

start app for development:
    `npm run dev`

start app for production:
    `npm run start`

### Project Directory Structure

    ├── /lyricsbar-phase2 (main directory)
        ├── /config
        ├── /models
        ├── /node_modules
        ├── /public
            ├── /css
            ├── /js
        ├── /routes
        ├── /views
        ├── .env
        ├── .gitignore
        ├── app.js
        ├── package-lock.json
        ├── package.json
        ├── README.md

## known bugs

ui doesnt always cover the full web page