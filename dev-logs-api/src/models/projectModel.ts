import { model, Schema } from 'mongoose';
import { Project } from '../interfaces';

const projectSchema = new Schema<Project>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    areaId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Area',
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

export const ProjectModel = model('Project', projectSchema);
