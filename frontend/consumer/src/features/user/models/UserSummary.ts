import { GetUsersResponseElement } from '@/pages/api/users';

class UserSummary {
  readonly id: number;
  readonly lastName: string;
  readonly firstName: string;
  readonly mailAddress: string;

  constructor(element: GetUsersResponseElement) {
    this.id = element.userId;
    this.lastName = element.lastName;
    this.firstName = element.firstName;
    this.mailAddress = element.mailAddress;
  }
}

export default UserSummary;
