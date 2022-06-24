'use strict';

const crypto = require('crypto');
const Buffer = require('buffer').Buffer;
const winext = require('winext');
const logger = require('winext-logger');
const lodash = winext.require('lodash');
const constants = require('../constants');
const { assign } = lodash;

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_UTILS.GENERATE_UTIL);

/**
 * @description Generate private and public key by crypto
 * @param {*} options
 */
const GenerateKeyPair = (options = {}) => {
  try {
    loggerFactory.info(`Function GenerateKeyPair has been start with options`, {
      args: options,
    });
    const defaultOptions = {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    };
    const keyPairOptions = assign({}, defaultOptions, options);

    const { privateKey, publicKey } = crypto.generateKeyPair('rsa', keyPairOptions);
    console.log("🚀 ~ file: generate-util.js ~ line 37 ~ GenerateKeyPair ~ publicKey", publicKey)
    console.log("🚀 ~ file: generate-util.js ~ line 37 ~ GenerateKeyPair ~ privateKey", privateKey)

    const verifiableData = 'this need to be verified';

    // The signature method takes the data we want to sign, the
    // hashing algorithm, and the padding scheme, and generates
    // a signature in the form of bytes
    const signature = crypto.sign('sha256', Buffer.from(verifiableData), {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    });
    //Convert the signature to base64 for storage.
    console.log(signature.toString('base64'));

    // To verify the data, we provide the same hashing algorithm and
    // padding scheme we provided to generate the signature, along
    // with the signature itself, the data that we want to
    // verify against the signature, and the public key
    const isVerified = crypto.verify(
      'sha256',
      Buffer.from(verifiableData),
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      },
      Buffer.from(signature.toString('base64'), 'base64')
    );

    // isVerified should be `true` if the signature is valid
    console.log('signature verified: ', isVerified);
    loggerFactory.info(`Function GenerateKeyPair has been end`);
  } catch (err) {
    loggerFactory.error(`Function GenerateKeyPair has error`, {
      args: err.message,
    });
    throw err;
  }
};

const generateUtils = {
  GenerateKeyPair,
};

module.exports = generateUtils;
