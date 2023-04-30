class User {
  static readonly LAST_NAME_MAX_LENGTH = 50;
  static readonly FIRST_NAME_MAX_LENGTH = 50;

  lastName: string;
  firstName: string;

  constructor(lastName: string, firstName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
  }
}

export default User;
