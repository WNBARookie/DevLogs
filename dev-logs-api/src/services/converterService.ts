import { Area, AreaInfo, User, UserInfo } from '../interfaces';

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

// convert area model into area object
export const convertArea = (area: Area): AreaInfo => {
  let convertedArea: AreaInfo = {
    id: area._id.toString(),
    title: area.title,
    description: area.description,
  };

  return convertedArea;
};
