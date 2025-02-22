import { model, Schema, Types } from 'mongoose';

interface Category {
  category: string;
}
const categorySchema = new Schema<Category>(
  {
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model('Category', categorySchema);
