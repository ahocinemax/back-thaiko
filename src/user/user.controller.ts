import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/')
    async createUser(@Body() data: { name: string; email: string }) {
        return this.userService.createUser(data.name, data.email);
    }

    @Get('/')
    async getUsers() {
        return this.userService.getUsers();
    }
}
