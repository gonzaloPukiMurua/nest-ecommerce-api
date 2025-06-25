import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './controllers/order-item.controller';

@Module({
  providers: [OrdersService, OrderItemService],
  controllers: [OrdersController, OrderItemController],
})
export class OrdersModule {}
