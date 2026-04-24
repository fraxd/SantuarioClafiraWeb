import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerHelper('eq', (a: any, b: any) => a === b);
  hbs.registerHelper('lookup', (arr: any[], idx: number) => arr[idx]);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Santuario Clafira running on http://localhost:${port}`);
}
bootstrap();
