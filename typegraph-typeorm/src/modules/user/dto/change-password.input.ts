import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  @MinLength(3)
  oldPassword: string;

  @Field()
  @MinLength(3)
  newPassword: string;
}
