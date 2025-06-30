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

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  document_number: string; // DNI, CUIT, etc.

  @Column({ nullable: true })
  tax_status: string; // Ej: Responsable Inscripto, Monotributo, etc.

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relación con ordenes de compra (si se registra por cliente)
  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @OneToOne(() => Address, { cascade: true, nullable: true})
  @JoinColumn()
  address: Address;
}
