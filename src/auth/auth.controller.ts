import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles';
import { RoleProtected } from './decorators/role-protected.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.loginUser(loginUserDto);
    }

    @Get('protected1')
    @UseGuards(AuthGuard())
    protected1() {
        return 'This is a protected route';
    }

    @Get('protected2')
    @UseGuards(AuthGuard(), UserRoleGuard)
    protected2() {
        return 'This is a protected2 route';
    }    

    @Get('protected3')
    @SetMetadata('roles', [ValidRoles.admin, ValidRoles.user])
    @UseGuards(AuthGuard(), UserRoleGuard)
    protected3() {
        return 'This is a protected2 route';
    }

    @Get('protected4')
    @RoleProtected(ValidRoles.admin, ValidRoles.superuser)
    @UseGuards(AuthGuard(), UserRoleGuard)
    protected4() {
        return 'This is a protected2 route';
    }

    @Get('protected5')
    @Auth(ValidRoles.admin, ValidRoles.user)
    protected5() {
        return 'This is a protected2 route';
    }   
}