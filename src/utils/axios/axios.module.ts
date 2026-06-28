import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxiosService } from './axios.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from '../../configs/app.config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      inject: [appConfig.KEY],
      useFactory: (config: ConfigType<typeof appConfig>) => {
        return {
          baseURL: config.apiBaseUrl,
          timeout: 30000,
          auth: {
            username: config.apikey.publicKey,
            password: config.apikey.secretKey,
          },
        };
      },
    }),
  ],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
