import {
  Get,
  Put,
  Post,
  Body,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { from } from 'rxjs';
import { QueriedEntity } from 'src/common/decorators';
import {
  UserEntity,
  defaultUserGroupsForSerializing,
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
  async get(@QueriedEntity() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: any): Promise<UserEntity> {
    return await this.usersService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @QueriedEntity() user: UserEntity,
    @Body() inputs: any,
  ): Promise<UserEntity> {
    return await this.usersService.update(user, inputs);
  }
}
