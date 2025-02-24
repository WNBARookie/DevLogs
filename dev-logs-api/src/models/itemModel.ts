import { model, Schema, Types } from "mongoose";

interface Item {
    title: string;
    description: string;
    skillsApplied: string;
    lessonsLearned: string;
    dateCompleted: Date;
    projectId: Types.ObjectId
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
        skillsApplied: {
            type: String,
            required: [true, 'Please add skills applied'],
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
        }
    },
    {
        timestamps: true,
    }
);

export const ItemModel = model('Item', itemSchema);