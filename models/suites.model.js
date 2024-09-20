import {db} from "../database/connection.database.js";

const create = async ({ name, price, capacity, count }) => {
  const query = {
    text: `
        INSERT INTO suites (name, price, capacity, count)
        VALUES ($1, $2, $3, $4)
        RETURNING name;`,
    values: [name, price, capacity, count],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const getIdByName = async(name)=>{
    const query = {
        text: `
        SELECT id_suite FROM suites
        WHERE name = $1;`,
        values: [name],
    };

    const {rows} = await db.query(query);
    return rows[0];
}

export const SuiteModel = {
    create,
    getIdByName
}