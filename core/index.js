'use strict';

const https = require('https');
const http = require('http');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessionParser = require('express-session');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const logger = require('winext-logger');

const RequestIdMiddleware = require('../middlewares/requestId');
const ErrorsMiddleware = require('../middlewares/errors');
const TokenMiddleware = require('../middlewares/token');

// configs
const { options, profiles } = require('../config');
const constants = require('../constants');

// routers
const InitRouters = require('../src/routers');

// services
const database = require('./db/database');
const redis = require('./services/redis');

const app = express();

app.use(cors(options.corsOptions));
app.use(morgan(logger.loggerMiddleware));
app.use(helmet());
app.use(cookieParser());
app.use(sessionParser(options.sessionOptions));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, '../public')));

const swaggerYaml = YAML.load(path.resolve(__dirname, '../public/docs', 'swagger.yaml'));
app.use(profiles.appDocs, swaggerUI.serve, swaggerUI.setup(swaggerYaml));

// middleware
app.use(RequestIdMiddleware());
app.use(TokenMiddleware());
app.use(ErrorsMiddleware);

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_NAME_CORE);

const server = {};

const instanceServer = profiles.isProduction ? https.createServer(options.server, app) : http.createServer(app);

const start = () => {
  instanceServer.listen(profiles.appPort, profiles.appHost, async (err) => {
    try {
      const host = instanceServer.address().address;
      const port = instanceServer.address().port;
      if (!err) {
        loggerFactory.data(`Swagger yaml`, {
          args: swaggerYaml,
        });

        if (swaggerYaml) {
          loggerFactory.http(`The swagger docs has been start`, {
            args: `[${profiles.appProtocol}://${host}:${port}${profiles.appDocs}]`,
          });
        }

        app.use(profiles.appPath, InitRouters);

        await database.startDB();
        await database.sequelize
          .sync({ alter: true, force: false })
          .then(() => {
            loggerFactory.info(`Update all model success`);
          })
          .catch((err) => {
            loggerFactory.error(`Update all model has error`, {
              args: err,
            });
            process.exit(1);
          });
        await redis.startRedis();

        loggerFactory.info(`The server has been start !!!`);

        loggerFactory.http(`The server is running on`, {
          args: `[${profiles.appProtocol}://${host}:${port}]`,
        });
      }
    } catch (error) {
      loggerFactory.error(`The server start has error`, {
        args: error,
      });
      throw error;
    }
  });
};

const stop = () => {
  instanceServer.on('close', async (err) => {
    try {
      if (!err) {
        await database.stopDB();
        await redis.stopRedis();
      }
    } catch (error) {
      loggerFactory.error(`The server stop has error`, {
        args: error.message,
      });
      throw error;
    }
  });
  loggerFactory.info(`The server has been stop !!!`);
  process.exit(0);
};

server.start = start;
server.stop = stop;

module.exports = server;
