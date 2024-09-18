import {db} from "../database/connection.database.js";

const create = async({user_id, suite_id, date})=>{
    const query = {
      text: `
        INSERT INTO reservations (user_id suite_id, date)
        VALUES ($1, $2, $3)
        RETURNING user_id, suite_id, date;`,
      values: [user_id, suite_id, date],
    };

    const { rows } = await db.query(query);
    return rows;
}

const getAllReservations = async()=>{
    const query = {
        text: `
        SELECT * FROM reservations inner join suites on reservation.id_suite = suites.id_suite inner join users on reservations.id_user = users.id_user;`,
    };

    const { rows } = await db.query(query);
    return rows;
}

export const ReservationModel = {
    create,
    getAllReservations
}