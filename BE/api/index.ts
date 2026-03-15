let expressApp: any;

async function bootstrap() {
  // Dynamic require prevents esbuild from bundling the entire NestJS app
  const mainPath = '../dist/src/main';
  // eslint-disable-next-line
  const { createApp } = require(mainPath);
  const app = await createApp();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  if (!expressApp) {
    expressApp = await bootstrap();
  }
  return expressApp(req, res);
}