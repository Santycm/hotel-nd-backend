import { UserModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, lastname, cedula, tel, email, password } = req.body;
    console.log(req.body);

    if (
      !name ||
      !lastname ||
      !cedula ||
      !tel ||
      !email ||
      !password
    ) {
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
      password: hashedPassword,
    });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ ok: true, token: token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    const user = await UserModel.findOneByEmail(email);

    if (!user) {
      return res.status(400).json({ ok: false, message: "User not found" });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ ok: true, token: token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

//ruta protegida
const profile = async (req, res) => {
  try{
    const user = await UserModel.findOneByEmail(req.email);
    return res.status(200).json({ ok: true, message: user });
  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const UserController = {
  register,
  login,
  profile
};
