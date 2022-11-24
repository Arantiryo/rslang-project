export interface UserDto {
  email: string;
  password: string;
}

export interface CreateUserDto extends UserDto {
  name: string;
}

export interface CreateUserWordDto {
  userId: string;
  wordId: string;
  word: Object;
  token: string;
}

export interface UserLoginInfo {
  message?: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export type UserLoginAction = {
  type: string;
  value: UserLoginInfo;
};
