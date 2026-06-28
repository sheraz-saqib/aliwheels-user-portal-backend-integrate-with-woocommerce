import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import AppConfig from './configs/app.config';
import ApiKeyConfig from './configs/api-key.config';
import { validate } from './utils/validators/env.validation';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, ApiKeyConfig],
      validate: validate,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
