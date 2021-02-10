import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserWhereUniqueInput } from '../dto';
import { User } from '../user.model';

@ValidatorConstraint({ name: 'user', async: true })
export class UserExistValidator implements ValidatorConstraintInterface {
  public async validate(emailOrUsername: string, _args: ValidationArguments) {
    const where: UserWhereUniqueInput = {
      email: emailOrUsername,
    };

    const user = await User.findOne({ where: where });
    if (user) return false;

    // If is username
    const where2: UserWhereUniqueInput = {
      username: emailOrUsername,
    };
    const checkAgain = await User.findOne({ where: where2 });
    if (checkAgain) return false;

    return true;
  }
  defaultMessage(_args: ValidationArguments) {
    return 'User with $property $value already exists';
  }
}
