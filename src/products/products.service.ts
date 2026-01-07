import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREAR
  async create(dto: CreateProductDto) {
    await this.prisma.product.create({
      data: {
        name: dto.name,
        price: new Prisma.Decimal(dto.price),
        description: dto.description,
      },
    });
    return 'Producto Creado';
  }

  // VER TODOS
  findAll() {
    return this.prisma.product.findMany();
  }

  // VER UNO
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  // ACTUALIZAR
  async updateProduct(id: number, dto: UpdateProductDto) {
    // Verificar que el producto existe
    const product = await this.prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const updateData: any = {};
    if (dto.name) updateData.name = dto.name;
    if (dto.price !== undefined) updateData.price = new Prisma.Decimal(dto.price);
    if (dto.description) updateData.description = dto.description;

    await this.prisma.product.update({
      where: { id },
      data: updateData,
    });

    return 'Producto actualizado';
  }

  // ELIMINAR
  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return 'Producto eliminado';
  }
}
