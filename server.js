'use strict';

const server = require('./core');

if (require.main === module) {
  server.start();
  const stopped = function () {
    server.stop();
  };
  process.on('SIGINT', stopped);
  process.on('SIGQUIT', stopped);
  process.on('SIGTERM', stopped);
}
