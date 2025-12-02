import { Body, Controller, HttpCode, Param } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { Get, Post, Delete, Patch } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { ParseObjectIdPipe } from '../../../common/pipes/parseObjectIdPipe'
import { UpdateUserDto } from '../dto/update-user.dto'
import type { ResponseApi } from 'src/common/interfaces/response-api.interface'
import type { UserModelWithoutPassword } from '../interfaces/users.interface'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<ResponseApi<UserModelWithoutPassword[]>> {
    const user = await this.usersService.findAll()
    return { message: 'Usuários encontrados com sucesso.', data: user }
  }

  @Get(':id')
  async findOneUser(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ResponseApi<UserModelWithoutPassword>> {
    const user = await this.usersService.findOne(id)
    return { message: 'Usuário encontrado com sucesso.', data: user }
  }

  @Post()
  async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<ResponseApi<UserModelWithoutPassword>> {
    const user = await this.usersService.create(dto)
    return { message: 'Usuário criado com sucesso.', data: user }
  }

  @Patch(':id')
  async update(
    @Body() dto: UpdateUserDto,
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ResponseApi<UserModelWithoutPassword>> {
    const user = await this.usersService.update(dto, id)
    return { message: 'Usuário atualizado com sucesso.', data: user }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.usersService.delete(id)
    return
  }
}
