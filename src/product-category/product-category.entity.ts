/* eslint-disable prettier/prettier */
// src/product-categories/entities/product-category.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../products/products.entity';
import { Category } from '../categories/categories.entity';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  // Relaciones
  @ManyToOne(() => Product, (product) => product.product_categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Category, (category) => category.product_categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
