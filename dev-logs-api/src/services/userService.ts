import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { convertUser } from '.';
import { AuthenticateUserRequestBody, User, UserInfo } from '../interfaces';
import { UserModel } from '../models';
import { getUserByEmail, getUserById } from '../repositories';

// Utility function to check if user exists
export const userExists = async (email: any, username: any): Promise<boolean> => {
  const userExistsEmail = await UserModel.findOne({ email });
  const userExistsUsername = await UserModel.findOne({ username });

  if (userExistsEmail || userExistsUsername) {
    return true;
  }

  return false;
};

//authenticate user
export const authenticateUserHelper = async (requestBody: AuthenticateUserRequestBody): Promise<string> => {
  const { email, password } = requestBody;

  const user = await getUserByEmail(email);
  if (user && user.password && (await bcrypt.compare(password, user.password))) {
    return generateToken(user._id.toString());
  }

  return '';
};

//get user by id
export const getFormattedUserById = async (id: string): Promise<UserInfo> => {
  try {
    const user = await getUserById(id);
    return convertUser(user as User) ?? ({} as User);
  } catch (err) {
    console.error(err);
    return {} as User;
  }
};

// generate JWT
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '30d' });
};
