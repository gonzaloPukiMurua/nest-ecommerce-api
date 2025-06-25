/* eslint-disable prettier/prettier */
// src/product-image/product-image.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity('product_image')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt_text: string;

  @Column()
  position: number;

  @Column({ default: false })
  is_primary: boolean;

  // Relaciones
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
