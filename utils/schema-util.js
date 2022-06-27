'use strict';

const adminLoginSchema = {
  type: 'object',
  properties: {
    userName: { type: 'string', maxLength: 10 },
    password: { type: 'string', maxLength: 10 },
  },
  required: ['userName', 'password'],
};

const realmSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 50 },
  },
  required: ['name'],
};

const userCreateSchema = {
  type: 'object',
  properties: {
    userName: { type: 'string', maxLength: 100 },
    realmName: { type: 'string' },
  },
  required: ['userName', 'realmName'],
};

const roleCreateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 100 },
  },
  required: ['name'],
};

const keyCreateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 100 },
  },
  required: ['name'],
};

const tokenCreateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 100 },
  },
  required: ['name'],
};

const schemaUtils = {
  adminLoginSchema,
  realmSchema,
  userCreateSchema,
  roleCreateSchema,
  keyCreateSchema,
  tokenCreateSchema,
};

module.exports = schemaUtils;
