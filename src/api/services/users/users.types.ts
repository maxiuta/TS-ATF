export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};
