import { Area, AreaInfo, Item, ItemInfo, Project, ProjectInfo, User, UserInfo } from '../interfaces';

// convert user model into user object
export const convertUser = (user: User): UserInfo => {
  let convertedUser: UserInfo = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
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

// convert project model into project object
export const convertProject = (project: Project): ProjectInfo => {
  let convertedProject: ProjectInfo = {
    id: project._id.toString(),
    title: project.title,
    description: project.description,
  };

  return convertedProject;
};

// convert item model into item object
export const convertItem = (item: Item): ItemInfo => {
  let convertedItem: ItemInfo = {
    id: item._id.toString(),
    title: item.title,
    description: item.description,
    whatWentWell: item.whatWentWell,
    whatDidNotGoWell: item.whatDidNotGoWell,
    lessonsLearned: item.lessonsLearned,
    dateCompleted: item.dateCompleted,
  };

  return convertedItem;
};
