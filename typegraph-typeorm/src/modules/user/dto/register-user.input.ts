import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserExistValidator } from '../decorators/user-exist.decorator';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @Validate(UserExistValidator)
  username: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
  @Validate(UserExistValidator)
  email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}
