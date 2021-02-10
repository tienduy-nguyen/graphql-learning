import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ResendRegisterTokenInput {
  @Field(() => String, { nullable: false })
  @IsEmail()
  email: string;
}
