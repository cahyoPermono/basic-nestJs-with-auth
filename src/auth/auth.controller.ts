import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginOutput } from './dtos/auth.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() req): Promise<LoginOutput> {
    const user = this.authService.validateUser(req.username, req.password);

    if (!user)
      throw new ForbiddenException('Your username or password is wrong!!');

    const { access_token } = await this.authService.login(user);
    return {
      statusCode: HttpStatus.OK,
      access_token,
    };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
