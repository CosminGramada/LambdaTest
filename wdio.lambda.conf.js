/* eslint-disable */
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  ...{
    services: [
      [
        'lambdatest',
        {
          tunnel: false,
          lambdatestOpts: {
            logFile: 'tunnel.log' 
          }
        }
      ]
    ],
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    path: '/wd/hub',
    hostname: 'hub.lambdatest.com',
    port: 80,
    capabilities: [
      // {
      //   name: 'Windows 10 - Chrome - Assignment test',
      //   platform: 'Windows 10',
      //   browserName: 'chrome',
      //   version: 'latest',
      //   resolution: '1920x1080',
      //   network: true,
      //   visual: true,
      //   console: true,
      //   video: true,
      // },
      {
        name: 'MacOS Catalina - Safari - Assignment test',
        platform : 'MacOS Catalina',
        browserName : 'safari',
        version : 'latest',
        resolution : '2560x1440',
        "safari.popups" : true,
        network: true,
        visual: true,
        console: true,
        video: true,
      }
    ],
  }
};
