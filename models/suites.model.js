import { db } from "../database/connection.database.js";

const create = async ({
  name,
  price,
  capacity,
  count,
  description,
  image_gallery,
}) => {
  const query = {
    text: `
        INSERT INTO suites (name, price, capacity, count, description, image_gallery)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING name;`,
    values: [name, price, capacity, count, description, image_gallery],
  };

  const { rows } = await db.query(query);
  return rows;
};

const getIdByName = async (name) => {
  const query = {
    text: `
        SELECT id_suite FROM suites
        WHERE name = $1;`,
    values: [name],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const getAllSuites = async () => {
  const query = {
    text: `
        SELECT * FROM suites;`,
  };

  const { rows } = await db.query(query);
  return rows;
};

const getSuiteById = async (id) => {
  const query = {
    text: `
            SELECT * FROM suites
            WHERE id_suite = $1;`,
    values: [id],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

export const SuiteModel = {
  create,
  getIdByName,
  getAllSuites,
  getSuiteById
};
