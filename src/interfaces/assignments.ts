export interface IAssignments {
  title: string;
  description: string;
  deadline: Date;
  createdBy: number;
}

export interface IUpdateAssignments {
  title?: string;
  description?: string;
  deadline?: Date;
  updatedBy: number;
  updatedAt: Date;
}
