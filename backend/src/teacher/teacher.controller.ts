import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { HttpHelper } from '../helpers/http-helper';
import { Access, Roles } from '../auth/decorator';
import { TokenType } from '../helpers/helper';
import { RoleUser } from '@prisma/client';
import { CreateTeacherDto } from './dto/teacher.dto';
import { AccessGuard, JwtGuard, RoleGuard } from '../auth/guard';

@Controller('teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private readonly httpHelper: HttpHelper,
  ) {}

  @Post()
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN)
  async create(@Body() dto: CreateTeacherDto, @Res() res) {
    const result = await this.teacherService.createTeacer(dto);
    return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
  }

  @Get('all')
  @UseGuards(JwtGuard, AccessGuard, RoleGuard)
  @Access(TokenType.FULL)
  @Roles(RoleUser.ADMIN, RoleUser.TEACHER, RoleUser.STUDENT)
  async findAll(@Res() res) {
    const result = await this.teacherService.findAll();
    return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
  }
}
