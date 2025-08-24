import { User, UserInfo } from '../interfaces';

// convert user model into user object
export const convertUser = (user: User): UserInfo => {
  let convertedUser: UserInfo = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    name: user.name,
  };

  return convertedUser;
};
