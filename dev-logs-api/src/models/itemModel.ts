import { model, Schema, Types } from 'mongoose';
import { Item } from '../interfaces';

const itemSchema = new Schema<Item>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    whatWentWell: {
      type: String,
      required: [true, 'Please add what went well'],
    },
    whatDidNotGoWell: {
      type: String,
      required: [true, 'Please add what did not go well'],
    },
    lessonsLearned: {
      type: String,
      required: [true, 'Please add lessons learned'],
    },
    dateCompleted: {
      type: Date,
      required: [true, 'Please add a date completed'],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const ItemModel = model('Item', itemSchema);
