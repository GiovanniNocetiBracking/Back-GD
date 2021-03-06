"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SensorSchema extends Schema {
  up() {
    this.create("sensors", (table) => {
      table.increments();
      table.integer("sensor").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("sensors");
  }
}

module.exports = SensorSchema;
