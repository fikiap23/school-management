import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/helpers/helper';
import { PayloadToken } from './type';
import { LoginAdminDto } from './dto/login-admin.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /*
    |--------------------------------------------------------------------------
    | Auth admin function
    |--------------------------------------------------------------------------
    */
  async adminRegister(dto: CreateAdminDto) {
    // hashing password from body dto
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    try {
      const userExist = await this.prisma.admin.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (userExist) {
        throw new BadRequestException('Admin already exist');
      }

      const user = await this.prisma.admin.create({
        data: {
          name: dto.name,
          username: dto.username,
          email: dto.email,
          password: hash,
        },
      });

      return await this.signJwtToken(user.id, RoleEnum.ADMIN);
    } catch (error) {
      throw error;
    }
  }

  async adminLogin(dto: LoginAdminDto) {
    try {
      const user = await this.prisma.admin.findFirst({
        where: {
          OR: [{ email: dto.email }, { username: dto.username }],
        },
      });

      if (!user) {
        throw new BadRequestException('Admin not found');
      }

      const validPassword = await bcrypt.compare(dto.password, user.password);

      if (!validPassword) {
        throw new BadRequestException('Invalid password');
      }

      return await this.signJwtToken(user.id, RoleEnum.ADMIN);
    } catch (error) {
      throw error;
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Helper auth function
    |--------------------------------------------------------------------------
    */

  private async signJwtToken(
    idUser: string,
    role: RoleEnum,
  ): Promise<{ access_token: string }> {
    //  payload user data for jwt token
    const payload: PayloadToken = {
      sub: idUser,
      role: role,
    };

    // create token with data payload
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token: token };
  }

  async decodeJwtToken(accessToken: string) {
    const decodedJwt = this.jwt.decode(
      accessToken.split(' ')[1],
    ) as PayloadToken;
    return decodedJwt;
  }

  async refreshJwtToken(accessToken: string) {
    const decodedJwt = await this.decodeJwtToken(accessToken);
    // check valid token
    if (!decodedJwt) {
      throw new BadRequestException('Invalid token');
    }

    if (decodedJwt.role === RoleEnum.ADMIN) {
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: decodedJwt.sub,
        },
      });
      if (!admin) {
        throw new BadRequestException('Invalid token');
      }
    } else if (decodedJwt.role === RoleEnum.TEACHER) {
      const teacher = await this.prisma.teacher.findUnique({
        where: {
          id: decodedJwt.sub,
        },
      });
      if (!teacher) {
        throw new BadRequestException('Invalid token');
      }
    } else if (decodedJwt.role === RoleEnum.STUDENT) {
      const student = await this.prisma.student.findUnique({
        where: {
          id: decodedJwt.sub,
        },
      });
      if (!student) {
        throw new BadRequestException('Invalid token');
      }
    } else {
      throw new BadRequestException('Invalid token');
    }

    return this.signJwtToken(decodedJwt.sub, decodedJwt.role);
  }
}
