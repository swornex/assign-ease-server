import { TABLES } from "../constants/collection";
import { IAssignments } from "../interfaces/asasignments";
import BaseModel from "./baseModel";

class AssignmentModel extends BaseModel {
  static addAssignments = (assignment: IAssignments) => {
    return this.queryBuilder().insert(assignment).into(TABLES.ASSIGNMENTS);
  };
}

export default AssignmentModel;
