import { model, Schema, Types } from 'mongoose';

interface Category {
  title: string;
  description: string;
  projectId: Types.ObjectId;
}

const categorySchema = new Schema<Category>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model('Category', categorySchema);
