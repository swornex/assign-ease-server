import BaseModel from "./baseModel";
import _ from "lodash";

class UserAssignmentStatus extends BaseModel {
  private static getBaseQuery() {
    return this.queryBuilder().select("*").from("user_assignment_status");
  }

  private static mapToModel(array: any[]) {
    // return array.map((row) => {
    //   return {
    //     assignmentId: row.assignmentId,
    //     title: row.title,
    //     submissions: [
    //       {
    //         userId: row.userId,
    //         name: row.name,
    //         submissionId: row.submissionId,
    //         isLateSubmitted: row.isLateSubmitted,
    //         status: row.status,
    //         evaluation: row.avgPoints
    //           ? {
    //               evaluatedBy: row.evaluatedBy,
    //               avgPoints: row.avgPoints
    //             }
    //           : null
    //       }
    //     ]
    //   };
    // });

    // Group by assignmentId
    const groupedByAssignment = _.groupBy(array, "assignmentId");

    // Map the grouped data to the desired format
    const result = _.map(groupedByAssignment, (assignments, assignmentId) => ({
      assignmentId,
      title: assignments[0].title,
      submissions: _.map(assignments, (assignment) => ({
        userId: assignment.userId,
        name: assignment.name,
        submissionId: assignment.submissionId,
        isLateSubmitted: assignment.isLateSubmitted,
        status: assignment.status,
        evaluation: assignment.evaluation
      }))
    }));

    const orderedResult = _.orderBy(result, ["assignmentId"], ["desc"]);

    return orderedResult;
  }

  static async getAllAssignmentData() {
    const query = await this.getBaseQuery().orderBy("assignment_id", "desc");
    // return query;
    return this.mapToModel(query);
  }

  static getDataByUserId(userId: number) {
    return this.getBaseQuery()
      .clearSelect()
      .select("title", "avg_points", "status")
      .where({ userId });
  }
}

export default UserAssignmentStatus;
