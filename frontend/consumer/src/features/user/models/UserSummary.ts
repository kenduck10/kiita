import { GetUsersResponseElement } from '@/pages/api/users';

class UserSummary {
  readonly id: number;
  readonly lastName: string;
  readonly firstName: string;

  constructor(element: GetUsersResponseElement) {
    this.id = element.userId;
    this.lastName = element.lastName;
    this.firstName = element.firstName;
  }
}

export default UserSummary;
