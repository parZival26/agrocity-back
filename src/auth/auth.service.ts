import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginDTO } from './dto/Login.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ){}

    async login(data: LoginDTO){
        try {
            const user = await this.prismaService.user.findUnique({
                where : {
                    username: data.username
                }
            })

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            }

            const validatePassword = await bcrypt.compare(data.password, user.password)

            if (!validatePassword) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            }

            const payload = { username: user.username }
            return {
                access_token: this.jwtService.sign(payload)
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError){
                switch (error.code) {
                    case 'P2002':
                        throw new Error('Username or email already exists')
                    default:
                        throw new Error('Internal server error')
                } 
            } else if(error instanceof HttpException) {
                throw error

            } else {
                console.error('Error: ', error)
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}
