import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { HttpHelper } from 'src/helpers/http-helper';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly httpHelper: HttpHelper,
  ) {}

  /*
    |--------------------------------------------------------------------------
    | Auth admin enpoint
    |--------------------------------------------------------------------------
    */

  @Post('admin/register')
  async adminRegister(@Body() dto: CreateAdminDto, @Res() res) {
    const result = await this.authService.adminRegister(dto);
    return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
  }

  @Post('admin/login')
  async adminLogin(@Body() dto: LoginAdminDto, @Res() res) {
    {
      const result = await this.authService.adminLogin(dto);
      return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    /*
    |--------------------------------------------------------------------------
    | Auth student enpoint
    |--------------------------------------------------------------------------
    */
  }
}
