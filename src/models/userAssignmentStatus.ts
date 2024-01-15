import { IUserAssignmentStatus } from "../interfaces/userAssignmentStatus";
import BaseModel from "./baseModel";
import _ from "lodash";

class UserAssignmentStatus extends BaseModel {
  private static getBaseQuery() {
    return this.queryBuilder().select("*").from("user_assignment_status");
  }

  private static mapToModel(array: any[]) {
    // Group by assignmentId
    const groupedByAssignment = _.groupBy(array, "assignmentId");

    // Map the grouped data to the desired format
    const result = _.map(groupedByAssignment, (assignments, assignmentId) => ({
      assignmentId: +assignmentId,
      title: assignments[0].title,
      submissions: _.map(assignments, (assignment) => ({
        userId: assignment.userId,
        name: assignment.name,
        userStatus: assignment.userStatus,
        submissionId: assignment.submissionId,
        isLateSubmitted: assignment.isLateSubmitted,
        assignmentStatus: assignment.assignmentStatus,
        evaluation: assignment.evaluation,
        submissionUrl: assignment.submissionUrl
      }))
    }));

    const orderedResult = _.orderBy(result, ["assignmentId"], ["desc"]);

    return orderedResult;
  }

  static async getAllAssignmentData(params: { offset: number; limit: number }) {
    const query = await this.getBaseQuery()
      .where("userStatus", "Active")
      .orderBy("assignment_id", "desc")
      .offset(params.offset)
      .limit(params.limit);

    return this.mapToModel(query);
  }

  static getDataByUserId(
    userId: number,
    params: { offset: number; limit: number }
  ) {
    const query = this.getBaseQuery()
      .clearSelect()
      .select("title", "avg_points", "assignment_status", "assignment_id")
      .where({ userId });

    query.offset(params.offset).limit(params.limit);

    return query;
  }

  static countAll(userId?: number) {
    if (userId) {
      return this.queryBuilder()
        .from("user_assignment_status")
        .where({ userId })
        .count("*")
        .first();
    }
    return this.queryBuilder()
      .from("user_assignment_status")
      .count("*")
      .first();
  }

  static getDataByUserAssignmentId = ({
    userId,
    assignmentId
  }: IUserAssignmentStatus) => {
    return this.queryBuilder()
      .select("*")
      .from("user_assignment_status")
      .where({ userId, assignmentId });
  };
}

export default UserAssignmentStatus;
