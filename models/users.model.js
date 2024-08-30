import { db } from "../database/connection.database.js";

const create = async ({
  id,
  name,
  lastname,
  tel,
  email,
  username,
  password,
}) => {
  const query = {
    text: `
    INSERT INTO users (id, name, lastname, tel, email, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING name, username, email;`,
    values: [id, name, lastname, tel, email, username, password],
  };

  const { rows } = await db.query(query);
  return rows;
};

const findOneByEmail = async (email) => {
  const query = {
    text: `
    SELECT * FROM users
    WHERE email = $1;`,
    values: [email],
  };

  const { rows } = await db.query(query);
  return rows;
}

export const UserModel = {
  create,
};
