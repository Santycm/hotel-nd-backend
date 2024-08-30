import { UserModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const {name, lastname, cedula, tel, email, username, password } = req.body;
    console.log(req.body);

    if (!name || !lastname || !cedula || !tel || !email || !username || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    const user = await UserModel.findOneByEmail(email);
    if (user) {
      return res
        .status(400)
        .json({ ok: false, message: "Email already registered" });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newUser = await UserModel.create({
      name,
      lastname,
      cedula,
      tel,
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ ok: true, token:token });
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
