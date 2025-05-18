import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  create(createProductDto: CreateProductDto) {
    // return this.prisma.product.create({
    //   data: createProductDto,
    // });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    // return this.prisma.product.update({
    //   where: { id },
    //   data: updateProductDto,
    // });
  }
}
