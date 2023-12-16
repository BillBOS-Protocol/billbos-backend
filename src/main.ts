import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './configs/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  await app.listen(configService.getPort(), () =>
    console.log(
      `server listen on ${configService.getPort()}, PG_HOST=${
        process.env.PG_HOST
      },
      PG_HOST=${process.env.PG_HOST},
      PG_PORT=${process.env.PG_PORT},
      PG_USER=${process.env.PG_USER},
      PG_PASSWORD=${process.env.PG_PASSWORD},
      PG_DATABASE=${process.env.PG_DATABASE},
      `,
    ),
  );
}
bootstrap();
