import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 /* async findByEmailWithPassword(email: string) {
  return this.userRepository.findOne({
    where: { email },
    select: ['id', 'email', 'password'],
  });
}*/


  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    await this.userRepository.save(user)
    return{
      message: 'Usuario creado correctamente'
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no ha sido encontrado');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // 👇 Si viene password, lo encriptamos
    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      dto.password = await bcrypt.hash(dto.password, salt);
    }

    // 👇 Solo actualiza los campos enviados
    Object.assign(user, dto);

    await this.userRepository.save(user);

    return {
      message: 'Usuario actualizado correctamente',
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
    return 'Usuario eliminado correctamente';
  }

  async findByEmail(email: string) {
    return  this.userRepository.findOne({ 
      where: {email} 
    });
  }
}
