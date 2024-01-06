import { Knex } from "knex";

const TABLE_NAME = "users";
const roles = ["Admin", "User"];
const status = ["Active", "Deleted"];
/**
 * Create table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("first_name").notNullable();

    table.string("last_name").nullable();

    table.string("email").notNullable().unique();

    table.string("password").notNullable();

    table.enum("role", roles).notNullable().defaultTo("User");

    table.enum("status", status).notNullable().defaultTo("Active");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .bigInteger("created_by")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users");

    table.timestamp("updated_at").nullable().defaultTo(knex.raw("now()"));

    table
      .bigInteger("updated_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .nullable();
  });
}

/**
 * Drop table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
