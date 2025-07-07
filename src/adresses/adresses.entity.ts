/* eslint-disable prettier/prettier */
// src/adresses/adresses.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('adresses')
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @Column()
  postalCode!: string;

  @Column()
  country!: string;

  @Column({ default: false })
  isPrimary!: boolean;

  @Column({
    type: 'enum',
    enum: ['billing', 'shipping', 'fiscal'],
    default: 'billing',
  })
  address_type!: 'billing' | 'shipping' | 'fiscal';
}
