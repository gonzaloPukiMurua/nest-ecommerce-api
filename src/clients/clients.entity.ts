/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../orders/entities/orders.entity';
import { Address } from 'src/adresses/adresses.entity';
import { Payment } from 'src/payments/payments.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  document_number!: string | null;

  @Column({ nullable: true })
  tax_status!: string | null;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  phone!: string | null;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Order, (order) => order.client)
  orders!: Order[];

  @OneToOne(() => Address, { cascade: true, nullable: true })
  @JoinColumn()
  address!: Address | null;

  @OneToMany(() => Payment, (payment) => payment.client)
  payments!: Payment[];
}
