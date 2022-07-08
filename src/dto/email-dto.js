'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty } = lodash;

// repository

const emailDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const {
        host,
        port,
        from,
        fromDisplayName,
        replyTo,
        replyToDisplayName,
        enableSSL,
        enableStartTLS,
        enableAuthentication,
      } = data;

      response.host = host;
      response.port = port;
      response.from = from;
      response.fromDisplayName = fromDisplayName;
      response.replyTo = replyTo;
      response.replyToDisplayName = replyToDisplayName;
      response.enableSSL = enableSSL;
      response.enableStartTLS = enableStartTLS;
      response.enableAuthentication = enableAuthentication;

      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = emailDTO;
