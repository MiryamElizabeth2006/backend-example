import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5173' || "http://localhost:3000" ;
  
  app.enableCors({
    origin: [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
}
bootstrap();
