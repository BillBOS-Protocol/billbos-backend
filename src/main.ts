import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4001;
  app.enableCors({ origin: '*' });
  await app.listen(PORT, () => console.log(`server listen on PORT ${PORT}`));
}
bootstrap();
