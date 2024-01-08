import { Knex } from "knex";
import { hashPassword } from "../../utils/bcrypt";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          first_name: "Admin",
          email: "admin@email.com",
          password: hashPassword("admin123"),
          role: "Admin"
        }
      ]);
    });
}
