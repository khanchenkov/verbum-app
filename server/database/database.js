const knex = require("knex");
require("dotenv").config();

const pg = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.PRODUCTION === "true" ?  { rejectUnauthorized: false } : null
    }
});

module.exports = pg;