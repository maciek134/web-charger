# web-charger
This is a web ui for SkyRC B6* line of chargers. Currently due to WebUSB being disabled in major browsers it's only tested in Chromium 66 on Arch x64.

## Setup
You need Node 6+.
```
$ git clone https://github.com/maciek134/web-charger.git
$ cd web-charger
$ npm install
$ npm start
```
And open `https://localhost:3000` - you may need to add the certificate to trusted authorities.