import serverlessExpress from '@vendia/serverless-express';

// eslint-disable-next-line
const { createApp } = require('../dist/src/main');

let server;

async function bootstrap() {
  const app = await createApp();
  const express = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: express });
}

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}