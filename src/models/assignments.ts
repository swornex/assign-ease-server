import { TABLES } from "../constants/collection";
import { IAssignments, IUpdateAssignments } from "../interfaces/assignments";
import BaseModel from "./baseModel";

class AssignmentModel extends BaseModel {
  static addAssignments = (assignment: IAssignments) => {
    return this.queryBuilder()
      .insert(assignment)
      .into(TABLES.ASSIGNMENTS)
      .returning("*");
  };

  static getAssignments = (params: { offset: number; limit: number }) => {
    const query = this.queryBuilder().select("*").from(TABLES.ASSIGNMENTS);

    query
      .orderBy("createdAt", "desc")
      .offset(params.offset)
      .limit(params.limit);

    return query;
  };

  static countAll = () => {
    return this.queryBuilder().count("*").from(TABLES.ASSIGNMENTS).first();
  };

  static getAssignmentById = (id: number) => {
    return this.queryBuilder()
      .select("*")
      .from(TABLES.ASSIGNMENTS)
      .where({ id });
  };

  static updateAssignment = (id: number, assignment: IUpdateAssignments) => {
    return this.queryBuilder()
      .update(assignment)
      .table(TABLES.ASSIGNMENTS)
      .where({ id })
      .returning("*");
  };
}

export default AssignmentModel;
