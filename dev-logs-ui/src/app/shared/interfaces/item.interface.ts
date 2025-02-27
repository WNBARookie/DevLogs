export interface Item {
  id: string;
  title: string;
  description: string;
  skillsApplied: string;
  lessonsLearned: string;
  dateCompleted: Date;
  projectId: string;
}

export interface AddItemRequestBody {
  title: string;
  description: string;
  skillsApplied: string;
  lessonsLearned: string;
  dateCompleted: string;
  projectId: string;
}

export interface UpdateItemRequestBody {
  title: string;
  description: string;
  skillsApplied: string;
  lessonsLearned: string;
  dateCompleted: string;
  itemId: string;
}
