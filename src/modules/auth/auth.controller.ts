import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { AuthResponse } from './@types/auth-response.interface';
import { Public } from '../../common/decorators/public.decorator';
import type { AuthenticatedRequest } from '../../common/interfaces/authenticated-request.interface';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ): Promise<AuthResponse> {
    return this.authService.login(res, dto);
  }

  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  verifyEmail(
    @Res({ passthrough: true }) res: Response,
    @Query() dto: VerifyEmailDto,
  ): Promise<string> {
    return this.authService.verifyEmail(res, dto);
  }

  @Get('me')
  me(@Req() req: AuthenticatedRequest): Promise<AuthResponse | null> {
    return this.authService.me(req.user);
  }
}
