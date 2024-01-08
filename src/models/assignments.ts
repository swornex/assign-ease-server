import { TABLES } from "../constants/collection";
import { IAssignments, IUpdateAssignments } from "../interfaces/assignments";
import BaseModel from "./baseModel";

class AssignmentModel extends BaseModel {
  static addAssignments = (assignment: IAssignments) => {
    return this.queryBuilder().insert(assignment).into(TABLES.ASSIGNMENTS);
  };

  static getAssignments = () => {
    return this.queryBuilder().select("*").from(TABLES.ASSIGNMENTS);
  };

  static getAssignmentById = (id: string) => {
    return this.queryBuilder()
      .select("*")
      .from(TABLES.ASSIGNMENTS)
      .where({ id });
  };

  static updateAssignment = (id: string, assignment: IUpdateAssignments) => {
    return this.queryBuilder()
      .update(assignment)
      .table(TABLES.ASSIGNMENTS)
      .where({ id })
      .returning("*");
  };
}

export default AssignmentModel;
