import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    return {
      message: 'Usuario creado correctamente',
    };
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        last: true,
        telefono: true,
        age: true,
        isActive: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        // password no se incluye por defecto
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        last: true,
        telefono: true,
        age: true,
        isActive: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no ha sido encontrado');
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({ where: { id } });
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Si viene password, lo encriptamos
    const updateData: any = { ...dto };
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return {
      message: 'Usuario actualizado correctamente',
    };
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return 'Usuario eliminado correctamente';
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
