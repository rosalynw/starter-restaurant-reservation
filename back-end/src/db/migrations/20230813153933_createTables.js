/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name").notNullable();
    table.integer("capacity").notNullable();
    table.string("status").notNullable();
    table.integer("reservation_id").unsigned();
    table.foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("SET NULL");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("tables");
};
