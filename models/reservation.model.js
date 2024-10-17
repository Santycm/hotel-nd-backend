import { db } from "../database/connection.database.js";

const create = async ({ id_suite, id_user, date }) => {
  const query = {
    text: `CALL sp_reservate($1, $2, $3)`,
    values: [id_suite, id_user, date],
  };

  try {
    await db.query(query);
    return { success: true, message: "Reservation created successfully" };
  } catch (error) {
    console.error("Error creating reservation:", error);
    return { success: false, message: "Failed to create reservation", error };
  }
};

const getAllReservations = async () => {
  const query = {
    text: `
        SELECT * FROM reservations inner join suites on reservation.id_suite = suites.id_suite inner join users on reservations.id_user = users.id_user;`,
  };

  const { rows } = await db.query(query);
  return rows;
};

const verifyAvaliability = async ({ id_suite, date }) => {
  const query = {
    text: `select verifyAvailable($1, $2)`,
    values: [date, id_suite],
  };

  const { rows } = await db.query(query);
  return rows;
};

export const ReservationModel = {
  create,
  getAllReservations,
  verifyAvaliability,
};
