import { GetUsersResponseElement } from '@/pages/api/users';

class UserSummary {
  id: number;
  lastName: string;
  firstName: string;

  constructor(element: GetUsersResponseElement) {
    this.id = element.userId;
    this.lastName = element.lastName;
    this.firstName = element.firstName;
  }
}

export default UserSummary;
