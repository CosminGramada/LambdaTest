/* eslint-disable */
const { ensureDirSync, removeSync } = require('fs-extra');
const { join } = require('path');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  ...{
    capabilities: [{
      browserName: 'chrome',
    }],
    jasmineNodeOpts: {
      // TypeScript setup
      requires: ['ts-node/register'],
      // Jasmine default timeout
      defaultTimeoutInterval: 600000,
    },
  }
};
