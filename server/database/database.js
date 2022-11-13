const knex = require("knex");
const parse = require("pg-connection-string").parse;
const pgconfig = parse(process.env.DATABASE_URL);
pgconfig.ssl = { rejectUnauthorized: false };

const pg = knex({
    client: "pg",
    connection: pgconfig,
});

module.exports = pg;