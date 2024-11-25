import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './model/users.model';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/input/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  updateUser(
    @Args('updateUserData') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserInput);
  }
}
