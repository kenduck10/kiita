import { GetUserResponse } from '@/pages/api/users/[id]';

class User {
  static readonly LAST_NAME_MAX_LENGTH = 50;
  static readonly FIRST_NAME_MAX_LENGTH = 50;

  id: number;
  lastName: string;
  firstName: string;

  constructor(id: number, response: GetUserResponse) {
    this.id = id;
    this.lastName = response.lastName;
    this.firstName = response.firstName;
  }
}

export default User;
