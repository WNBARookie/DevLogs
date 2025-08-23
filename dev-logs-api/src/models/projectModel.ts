import { model, Schema, Types } from 'mongoose';

interface Project {
  title: string;
  description: string;
  areaId: Types.ObjectId;
}

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
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = model('Project', projectSchema);
