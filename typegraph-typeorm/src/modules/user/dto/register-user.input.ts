import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
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
