let expressApp: any;

async function bootstrap() {
  // eval('require') prevents Vercel's esbuild from bundling the NestJS app
  // eslint-disable-next-line no-eval
  const dynamicRequire = eval('require');
  const { createApp } = dynamicRequire('../dist/src/main');
  const app = await createApp();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  if (!expressApp) {
    expressApp = await bootstrap();
  }
  return expressApp(req, res);
}