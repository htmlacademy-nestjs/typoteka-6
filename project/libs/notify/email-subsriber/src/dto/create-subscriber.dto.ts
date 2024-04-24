import { IsEmail, IsNotEmpty } from 'class-validator';

import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
  USER_ID_IS_EMPTY
} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public firstname: string;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  public lastname: string;
}
