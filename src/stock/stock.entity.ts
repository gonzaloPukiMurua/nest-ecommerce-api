/* eslint-disable prettier/prettier */
// src/stock/entities/stock.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', default: 0 })
  quantity!: number;

  @Column({ default: true })
  active!: boolean;

  @UpdateDateColumn()
  updated_at!: Date;

  // Relaciones
  @OneToOne(() => Product, (product) => product.stock, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' }) // clave FK explícita
  product!: Product;
}
