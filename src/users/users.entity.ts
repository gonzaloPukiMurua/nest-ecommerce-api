/* eslint-disable prettier/prettier */

// src/users/user.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CartItem } from '../cart-item/cart-item.entity';
import { Order } from '../orders/entities/orders.entity';
import { Address } from '../adresses/adresses.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  profile_picture?: string;

  @Column({ default: 'customer' })
  role!: string;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cart_items!: CartItem[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToOne(() => Address, { cascade: true, nullable: true })
  @JoinColumn()
  address?: Address;
}
