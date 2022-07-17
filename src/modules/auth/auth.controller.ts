import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@CurrentUser() user) {
    // const user = req.user;
    const { access_token } = await this.authService.login(user);

    return {
      user,
      access_token,
    };
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('user / email has existed');
    }
    const user = await this.userService.create(createUserDto);
    const { access_token } = await this.authService.login(user);

    return {
      user,
      access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user) {
    const { userId } = user;
    // console.log(`id: `, userId, +userId);
    const profile = await this.userService.findOne(userId);
    return {
      profile,
    };
  }
}
