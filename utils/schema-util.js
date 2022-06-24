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
    firstName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    userName: { type: 'string', maxLength: 100 },
    email: { type: 'string' },
  },
  required: ['firstName', 'lastName', 'userName', 'email'],
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
  tokenCreateSchema
};

module.exports = schemaUtils;
