import { ProductImage } from '.';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/User.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example:
      'The look of cotton with "AIRism" performance. Narrower neckline for a clean, neat style.',
    description: 'Product description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product SLUG - for SEO',
    default: null,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'XL', 'XXL'],
    description: 'Product sizes',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  @BeforeUpdate()
  checkSlugUpdate() {
    // if (!this.slug) {
    //   this.slug = this.title;
    // }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
