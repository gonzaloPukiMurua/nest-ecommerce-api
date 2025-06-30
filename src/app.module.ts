/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { ProductImageModule } from './product-image/product-image.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AdressesModule } from './adresses/adresses.module';
import { ClientsModule } from './clients/clients.module';
import { PaymentsModule } from './payments/payments.module';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false
      }),
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CartItemModule,
    ProductImageModule,
    CategoriesModule,
    ProductCategoryModule,
    StockModule,
    AuthModule,
    SuppliersModule,
    AdressesModule,
    ClientsModule,
    PaymentsModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
