import { db } from "../database/connection.database.js";

const create = async ({ id_suite, date, available_suites }) => {
    console.log({ id_suite, date, available_suites });
  const query = {
    text: `
        INSERT INTO suite_availability (id_suite, date, available_suites)`,
    values: [id_suite, date, available_suites],
  };
  const { rows } = await db.query(query);
  return rows;
};

const update = async ({ id_suite, date, available_suites }) => {
    const query = {
        text: `
            UPDATE suite_availability
            SET available_suites = $3
            WHERE id_suite = $1 AND date = $2`,
        values: [id_suite, date, available_suites],
    };
    const { rows } = await db.query(query);
    return rows;
}

const checkAvailability = async ({ id_suite, date }) => {
    const query = {
        text: `
            SELECT available_suites FROM suite_availability
            WHERE id_suite = $1 AND date = $2 AND available_suites > 0`,
        values: [id_suite, date],
    };
    const { rows } = await db.query(query);
    return rows[0];
}

export const SuiteAvailabilityModel = {
  create,
  update,
  checkAvailability,
};
