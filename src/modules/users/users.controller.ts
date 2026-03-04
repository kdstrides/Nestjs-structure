import {
  Get,
  Param,
  Put,
  Post,
  Body,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  UserEntity,
  extendedUserGroupsForSerializing,
} from 'src/models/users/serializers/users.serializer';
import { UsersService } from './users.service';

@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(@Param('id') id: string): Promise<UserEntity> {
    return (await this.usersService.get(id, [], true)) as UserEntity;
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: any): Promise<UserEntity> {
    return await this.usersService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() inputs: any,
  ): Promise<UserEntity> {
    const user = (await this.usersService.get(id, [], true)) as UserEntity;
    return await this.usersService.update(user, inputs);
  }
}
