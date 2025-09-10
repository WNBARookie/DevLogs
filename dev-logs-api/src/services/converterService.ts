import { Area, AreaInfo, Project, ProjectInfo, User, UserInfo } from '../interfaces';

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

// convert project model into area object
export const convertProject = (project: Project): ProjectInfo => {
  let convertedProject: ProjectInfo = {
    id: project._id.toString(),
    title: project.title,
    description: project.description,
  };

  return convertedProject;
};
