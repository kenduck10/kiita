import { GetUsersResponse } from '@/pages/api/users';
import UserSummary from '@/features/user/models/UserSummary';

class UserSummaries {
  value: Array<UserSummary>;

  constructor(response: GetUsersResponse) {
    this.value = response.users.map((user) => new UserSummary(user.userId, user.lastName, user.firstName));
  }
}

export default UserSummaries;
