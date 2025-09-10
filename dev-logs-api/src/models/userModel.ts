import { model, Schema } from 'mongoose';
import { User } from '../interfaces';

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model('User', userSchema);
