import { model, Schema, Types } from 'mongoose';

interface Area {
  title: string;
}

const areaSchema = new Schema<Area>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
  },
  {
    timestamps: true,
  }
);

export const AreaModel = model('Area', areaSchema);
