import { Knex } from "knex";

const TABLE_NAME = "submissions";

/**
 * Create table submissions.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("submission_url").notNullable();

    table
      .bigInteger("assignment_id")
      .unsigned()
      .references("id")
      .inTable("assignments")
      .notNullable();

    table
      .bigInteger("submitted_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
}

/**
 * Drop table submissions.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
