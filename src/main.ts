import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './configs/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  await app.listen(configService.getPort(), () =>
    console.log(`server listen on ${configService.getPort()}`),
  );
}
bootstrap();
