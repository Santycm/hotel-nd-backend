import {db} from "../database/connection.database.js";

const create = async ({ name, price, capacity }) => {
  const query = {
    text: `
        INSERT INTO suites (name, price, capacity)
        VALUES ($1, $2, $3)
        RETURNING id;`,
    values: [name, price, capacity],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const getIdByName = async(name)=>{
    const query = {
        text: `
        SELECT id FROM suites
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