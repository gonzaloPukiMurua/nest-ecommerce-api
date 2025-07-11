/* eslint-disable prettier/prettier */
// src/products/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { ProductImage } from '../product-image/product-image.entity';
import { CartItem } from '../cart-item/cart-item.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { ProductCategory } from 'src/product-category/product-category.entity';
import { Stock } from 'src/stock/stock.entity';
import { Supplier } from 'src/suppliers/suppliers.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  internal_code!: string;

  @Column()
  sku!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'decimal' })
  cost!: number;

  @Column({ type: 'decimal' })
  margin!: number;

  @Column({ type: 'decimal' })
  sale_price!: number;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // Relaciones
  @OneToMany(() => ProductImage, (image) => image.product)
  images!: ProductImage[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cart_items!: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items!: OrderItem[];

  @OneToMany(() => ProductCategory, pc => pc.product, { cascade: true })
  product_categories!: ProductCategory[];

  @OneToOne(() => Stock, stock => stock.product)
  stock!: Stock;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, { nullable: true })
  supplier!: Supplier;

}
