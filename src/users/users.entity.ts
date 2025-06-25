/* eslint-disable prettier/prettier */
// src/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from '../cart-item/cart-item.entity';
import { Order } from '../orders/entities/orders.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ default: 'customer' })
  role: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cart_items: CartItem[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
