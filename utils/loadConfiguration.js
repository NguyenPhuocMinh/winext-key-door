'use strict';

const fs = require('fs');

const loadConfiguration = (configPath) => {
  const json = fs.readFileSync(configPath);
  const configure = JSON.parse(json.toString());

  return configure;
};

module.exports = loadConfiguration;
