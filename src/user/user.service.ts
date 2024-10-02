import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {

    constructor(private readonly prismaService: PrismaService) {}

    async createUser(data: CreateUserDTO) {
        try {                        
            return await this.prismaService.user.create({
                data: {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: encodePassword(data.password)
                }
            });
        }
        catch (error) {
            
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        throw new HttpException('Username or email already exists', HttpStatus.CONFLICT);
                    default:
                        console.log(error);
                        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
                }
                
                
            }else{
                console.log(error);
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        
    }

}
