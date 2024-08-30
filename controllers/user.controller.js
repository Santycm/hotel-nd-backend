import { UserModel } from "../models/users.model.js";

const register = async (req, res) => {
  try {
    const { id, name, lastname, tel, email, username, password } = req.body;

    return res.json({ ok: true, message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const UserController = {
  register,
  login,
};
