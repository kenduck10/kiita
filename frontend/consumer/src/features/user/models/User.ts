import { GetUserResponse } from '@/pages/api/users/[id]';

class User {
  static readonly LAST_NAME_MAX_LENGTH = 50;
  static readonly FIRST_NAME_MAX_LENGTH = 50;

  readonly id?: number;
  readonly lastName: string;
  readonly firstName: string;
  readonly mailAddress: string;

  constructor(id: number, response: GetUserResponse) {
    this.id = id;
    this.lastName = response.lastName;
    this.firstName = response.firstName;
    this.mailAddress = response.mailAddress;
  }
}

export default User;
