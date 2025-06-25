/* eslint-disable prettier/prettier */
// src/cart-item/cart-item.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Entity('cart_item')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => User, (user) => user.cart_items, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.cart_items, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
