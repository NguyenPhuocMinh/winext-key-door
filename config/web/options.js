'use strict';

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const sessionParser = require('express-session');
const profiles = require('./profiles');

dotenv.config();

const server = {
  key: fs.readFileSync(path.resolve(__dirname, '../../data', 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../data', 'cert.pem')),
};

const corsOptions = {
  credentials: false, // true for cookie
  origin: '*',
};

const memoryStore = new sessionParser.MemoryStore();
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
};

const sequelizeOptions = {
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const tokenOptions = {
  expiresIn: 86400,
};

const cookieOptions = {
  maxAge: 900,
  httpOnly: true,
  sameSite: 'strict',
  secure: profiles.isProduction,
};

const options = {
  server,
  corsOptions,
  sessionOptions,
  sequelizeOptions,
  tokenOptions,
  cookieOptions,
};

module.exports = options;
