import bcrypt from 'bcryptjs';
import { CreateUserRequestBody, User } from '../interfaces';
import { UserModel } from '../models';

// get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email: new RegExp(`^${email}$`, 'i') });
};

// get user by email
export const getUserById = async (id: string): Promise<User | null> => {
  return await UserModel.findById(id);
};

// create user
export const createUser = async (requestBody: CreateUserRequestBody): Promise<User> => {
  const { username, email, password, name } = requestBody;

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create user
  return await UserModel.create({
    username,
    email,
    password: hashedPassword,
    name,
  });
};
