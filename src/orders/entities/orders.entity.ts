/* eslint-disable prettier/prettier */
// src/orders/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/users.entity';
import { OrderItem } from './order-item.entity';
import { Client } from 'src/clients/clients.entity';
import { Payment } from 'src/payments/payments.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', default: 0 })
  general_discount!: number;

  @Column({ type: 'decimal', default: 0 })
  general_surcharge!: number;

  @Column({ type: 'decimal' })
  total!: number;

  @Column()
  status!: string;

  @Column()
  is_draft!: boolean;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // Relaciones
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  order_items!: OrderItem[];

  @ManyToOne(() => Client, (client) => client.orders, { nullable: true })
  client!: Client | null;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments!: Payment[];
}
