import { User } from '../interfaces';

// convert user model into user object
export const convertUser = (user: any): User => {
  let convertedUser: User = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    name: user.name,
  };

  return convertedUser;
};
