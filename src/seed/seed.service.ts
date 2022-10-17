import { Injectable } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  @Auth()
  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewProducts(adminUser);
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(users);
    return dbUsers[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();
    const products = initialData.products;
    const insertPromise = [];
    products.forEach((product) =>
      insertPromise.push(this.productsService.create(product, user)),
    );
    await Promise.all(insertPromise);
    // await Promise.all(
    //   products.map(
    //     async (product) => await this.productsService.create(product),
    //   ),
    // );
    return true;
  }
}
