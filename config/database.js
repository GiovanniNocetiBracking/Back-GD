"use strict";

const Env = use("Env");

const Helpers = use("Helpers");
const URL = require("url-parse");
const PROD_MYSQL_DB = new URL(Env.get("CLEARDB_DATABASE_URL"));

module.exports = {
  connection: Env.get("DB_CONNECTION", "sqlite"),

  sqlite: {
    client: "sqlite3",
    connection: {
      filename: Helpers.databasePath(
        `${Env.get("DB_DATABASE", "adonis")}.sqlite`
      )
    },
    useNullAsDefault: true,
    debug: Env.get("DB_DEBUG", false)
  },

  mysql: {
    client: "mysql",
    connection: {
      host: Env.get("DB_HOST", PROD_MYSQL_DB.host),
      port: Env.get("DB_PORT", ""),
      user: Env.get("DB_USER", PROD_MYSQL_DB.username),
      password: Env.get("DB_PASSWORD", PROD_MYSQL_DB.password),
      database: Env.get("DB_DATABASE", PROD_MYSQL_DB.pathname.substr(1))
    },
    debug: Env.get("DB_DEBUG", false)
  }
};