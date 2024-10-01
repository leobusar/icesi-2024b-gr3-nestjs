import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}
    
    async createUser(createUserDto: CreateUserDto) {
        try{
            const {password, ...userData} = createUserDto;

            const user = this.userRepository.create({
                password : bcrypt.hashSync(password, 10),
                ...userData});
            await  this.userRepository.save(user);

            return user;

        }catch(e) {
            this.handleDBErrors(e);
        }
    }
    async  loginUser(loginUserDto: LoginUserDto){
        const {email, password} = loginUserDto;
        const user = await this.userRepository.findOne({
            where: {email}, 
            select: ['id', 'email', 'password']
            });
        if(!user || !bcrypt.compareSync(password, user.password)) 
            throw new UnauthorizedException('Invalid credentials');

        
        return { user_id: user.id, email: user.email,
                token: this.jwtService.sign({user_id: user.id})
        };

    }

    private  handleDBErrors(error: any) {
        if(error.code === '23505') {
            throw new BadRequestException('User already exists');
        }

        throw new InternalServerErrorException('Error creating user');
    }
}
