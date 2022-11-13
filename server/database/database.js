const knex = require("knex");
require("dotenv").config();

let pgConfig = process.env.DATABASE_URL;

if (process.env.PRODUCTION === true) {
    const parse = require("pg-connection-string").parse;
    const pgConfig = parse(process.env.DATABASE_URL);
    pgConfig.ssl = { rejectUnauthorized: false };
}

const pg = knex({
    client: "pg",
    connection: pgConfig,
});

module.exports = pg;