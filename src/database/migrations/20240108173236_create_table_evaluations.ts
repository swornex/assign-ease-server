import { Knex } from "knex";

const TABLE_NAME = "evaluations";

/**
 * Create table evaluations.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.integer("problem_solving_points").notNullable();

    table.integer("final_product_points").notNullable();

    table.integer("code_quality_points").notNullable();

    table.text("remarks").notNullable();

    table
      .bigInteger("submission_id")
      .unsigned()
      .references("id")
      .inTable("submissions")
      .notNullable();

    table
      .bigInteger("evaluated_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
