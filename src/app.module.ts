import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { ReportsModule } from './modules/reports/reports.module';
import { TaxesModule } from './modules/taxes/taxes.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { PaymentGatewaysModule } from './modules/payment-gateways/payment-gateways.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SystemStatusModule } from './modules/system-status/system-status.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { DataModule } from './modules/data/data.module';
import { CommonModule } from './common/common.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import AppConfig from './configs/app.config';
import ApiKeyConfig from './configs/api-key.config';
import DatabaseConfig from './configs/database.config';
import AuthConfig from './configs/auth.config';
import MailerConfig from './configs/mailer.config';
import { validate } from './utils/validators/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, ApiKeyConfig, DatabaseConfig, AuthConfig, MailerConfig],
      validate: validate,
    }),
    MongooseModule.forRootAsync({
      inject: [DatabaseConfig.KEY],
      useFactory: (config: ConfigType<typeof DatabaseConfig>) => ({
        uri: config.uri,
      }),
    }),
    CommonModule,
    AccountsModule,
    AuthModule,
    NotificationsModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    CouponsModule,
    ReportsModule,
    TaxesModule,
    ShippingModule,
    PaymentGatewaysModule,
    SettingsModule,
    SystemStatusModule,
    WebhooksModule,
    DataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
