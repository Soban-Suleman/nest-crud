import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();
(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, () =>
    console.log(`Application running on Port ${process.env.PORT}`),
  );
})();
