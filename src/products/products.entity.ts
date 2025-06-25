/* eslint-disable prettier/prettier */
// src/products/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from '../product-image/product-image.entity';
import { CartItem } from '../cart-item/cart-item.entity';
import { OrderItem } from '../orders/order-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  internal_code: string;

  @Column()
  sku: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal' })
  cost: number;

  @Column({ type: 'decimal' })
  margin: number;

  @Column({ type: 'decimal' })
  sale_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cart_items: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items: OrderItem[];
}
