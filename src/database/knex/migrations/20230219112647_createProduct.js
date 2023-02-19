exports.up = (knex) =>
  knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.string("thumbnail");
    table.string("name");
    table.integer("category_id").references("id").inTable("categories");
    table.decimal("price").default(0);
    table.text("description");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("products");
