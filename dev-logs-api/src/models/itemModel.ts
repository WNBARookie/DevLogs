import { model, Schema, Types } from 'mongoose';

interface Item {
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
  categoryId: Types.ObjectId;
}

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
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ItemModel = model('Item', itemSchema);
