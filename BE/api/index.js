let expressApp;

async function bootstrap() {
  const { createApp } = require('../dist/src/main');
  const app = await createApp();
  return app.getHttpAdapter().getInstance();
}

module.exports = async function handler(req, res) {
  if (!expressApp) {
    expressApp = await bootstrap();
  }
  return expressApp(req, res);
};
