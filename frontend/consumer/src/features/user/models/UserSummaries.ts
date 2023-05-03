import { GetUsersResponse } from '@/pages/api/users';
import UserSummary from '@/features/user/models/UserSummary';

class UserSummaries {
  readonly value: Array<UserSummary>;

  constructor(response: GetUsersResponse) {
    this.value = response.users.map((element) => new UserSummary(element));
  }
}

export default UserSummaries;
