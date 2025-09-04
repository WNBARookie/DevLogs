import { model, Schema, Types } from 'mongoose';
import { Area } from '../interfaces';

const areaSchema = new Schema<Area>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
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

export const AreaModel = model('Area', areaSchema);
