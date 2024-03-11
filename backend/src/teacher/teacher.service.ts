import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/teacher.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.teacher.findMany();
  }

  async findOne(id: string) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  async createTeacer(dto: CreateTeacherDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    return this.prisma.teacher.create({
      data: {
        name: dto.name,
        nuptk: dto.nuptk,
        email: dto.email,
        password: hash,
        avatar: dto.avatar,
      },
    });
  }
}
