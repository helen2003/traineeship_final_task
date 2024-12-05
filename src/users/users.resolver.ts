import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UserModel } from './model/users.model';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/input/update-user.input';
import { RoleEnum, User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ValidateUser } from 'src/common/decorators/dto/validate-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @CurrentUser() user: ValidateUser,
    @Args('updateUserData') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(user, updateUserInput);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @CurrentUser() user: ValidateUser,
    @Args('password', { type: () => String }) password: string,
  ): Promise<User> {
    return this.usersService.updatePassword(user, password);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  updateRole(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('role', { type: () => String }) role: RoleEnum,
  ): Promise<User> {
    return this.usersService.updateRole(userId, role);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  deleteAccount(
    @CurrentUser() user: ValidateUser,
  ): Promise<User> {
    return this.usersService.delete(user);
  }
}
