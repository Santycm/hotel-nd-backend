import { db } from "../database/connection.database.js";

const create = async ({
  name,
  lastname,
  cedula,
  tel,
  email,
 
  password,
}) => {
  const query = {
    text: `
    INSERT INTO users (name, lastname, cedula,  tel, email, password)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING name, email;`,
    values: [name, lastname, cedula, tel, email, password],
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
  return rows[0];
}

export const UserModel = {
  create,
  findOneByEmail
};
