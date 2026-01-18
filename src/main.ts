import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const first = errors[0];
        const firstMsg = first?.constraints
          ? Object.values(first.constraints)[0]
          : 'Validation error';

        return new (require('@nestjs/common').BadRequestException)({
          message: firstMsg,
          error: "Bad Request",
          statusCode: 400
        });
      },
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
