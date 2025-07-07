/* eslint-disable prettier/prettier */
// src/orders/order-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from '../../products/products.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal' })
  quantity!: number;

  @Column({ type: 'decimal' })
  unit_price!: number;

  @Column({ type: 'decimal', default: 0 })
  discount!: number;

  @Column({ type: 'decimal' })
  subtotal!: number;

  @Column({ default: true })
  active!: boolean;

  // Relaciones
  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.order_items, {
    onDelete: 'CASCADE',
  })
  product!: Product;
}
