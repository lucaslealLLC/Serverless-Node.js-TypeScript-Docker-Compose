import "reflect-metadata"
import type { AWS } from '@serverless/typescript';

import createData from '@functions/create'
import readData from '@functions/read'
import updateData from '@functions/update'
import deleteData from '@functions/delete'

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '3',
  custom: {
    myStage: '${opt:stage, "prod"}',
    settings: {
      dev: {
        HOST: "mysql",
        PORT: "3306",
        USERNAME: "root",
        PASSWORD: "senha",
        DATABASE:"basicDataBase_dev"
      },
      prod: {
        HOST: "mysql",
        PORT: "3306",
        USERNAME: "root",
        PASSWORD: "senha",
        DATABASE:"basicDataBase"
      }
    },
    "serverless-offline": {
      httpPort: 5000,
      host: '0.0.0.0'
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: '${self:custom.myStage}',
      HOST: '${self:custom.settings.${self:custom.myStage}.HOST}',
      PORT: '${self:custom.settings.${self:custom.myStage}.PORT}',
      USERNAME: '${self:custom.settings.${self:custom.myStage}.USERNAME}',
      PASSWORD: '${self:custom.settings.${self:custom.myStage}.PASSWORD}',
      DATABASE: '${self:custom.settings.${self:custom.myStage}.DATABASE}'
    },
  },
  functions: { createData, readData, updateData, deleteData },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
