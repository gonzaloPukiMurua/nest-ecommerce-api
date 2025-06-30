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
import { Product } from '../products/products.entity';
import { Address } from 'src/adresses/adresses.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  contact_name: string;

  @Column({ nullable: true })
  contact_email: string;

  @Column({ nullable: true })
  contact_phone: string;

  @Column({ nullable: true })
  tax_id: string; // CUIT, RUC, etc.

  @Column({ type: 'numeric', nullable: true })
  discount_rate: number; // Ej: 10.5 para 10.5%

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relación con productos (opcional, si querés mantener trazabilidad)
  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToOne(() => Address, { cascade: true, nullable: true})
  @JoinColumn()
  address: Address;
}
