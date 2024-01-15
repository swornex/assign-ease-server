import { Knex } from "knex";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE VIEW user_assignment_status AS (
    SELECT
      u.id AS user_id,
      u.first_name || ' ' || u.last_name AS name,
      u.status as user_status,
      a.id AS assignment_id,
      a.title,
      e.evaluated_by,
      s.id AS submission_id,
      s.submission_url AS submission_url,
      a.description,
      a.deadline,
      ROUND((e.problem_solving_points + e.final_product_points + e.code_quality_points) / 3) AS avg_points,
      CASE
        WHEN s.id IS NOT NULL AND e.id IS NOT NULL THEN 'Evaluated'
        WHEN s.id IS NOT NULL THEN 'Submitted'
        ELSE 'Pending'
      END AS assignment_status,
      COALESCE(s.created_at > a.deadline, FALSE) AS is_late_submitted
    FROM
      users u
    INNER JOIN assignments a ON true
    LEFT JOIN submissions s ON a.id = s.assignment_id AND u.id = s.submitted_by
    LEFT JOIN evaluations e ON s.id = e.submission_id
    WHERE
      u.role = 'User'
    ORDER BY u.id
  )
`);
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP VIEW user_assignment_status");
}
