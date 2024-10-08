import { UserModel } from "../models/users.model.js";
import { SuiteModel } from "../models/suites.model.js";
import { ReservationModel } from "../models/reservation.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, lastname, cedula, tel, email, password } = req.body;

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

    if (!newUser) {
      return res
        .status(400)
        .json({ ok: false, message: "Failed to create user" });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
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

const createReservation = async (req, res) => {
  try{
    const {user_email, suite_name, date } = req.body;

    if(!user_email || !suite_name || !date){
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    const user = await UserModel.findOneByEmail(user_email);
    if(!user){
      return res
        .status(400)
        .json({ ok: false, message: "User not found" });
    }

    const {id_user} = await UserModel.getIdByEmail(user_email);
    const {id_suite} = await SuiteModel.getIdByName(suite_name);

    const reservation = await ReservationModel.create({
      id_suite: id_suite,
      id_user: id_user,
      date,
    });

    if(reservation.success === false){
      return res.status(400).json({ ok: false, message: "Failed to create reservation" });
    }

    return res.status(201).json({ ok: true, message: reservation });

  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}

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

//Dev TEST
const getSuites = async (req, res) => {
  try {
    const suites = await SuiteModel.getAllSuites();
    return res.status(200).json({ ok: true, suites: suites });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    return res.status(200).json({ ok: true, message: users });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}

const createSuite = async (req, res) => {
  try {
    const { name, price, capacity, count } = req.body;

    if (!name || !price || !capacity || !count) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    const suite = await SuiteModel.create({ name, price, capacity, count });

    return res.status(201).json({ ok: true, message: suite });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}



export const UserController = {
  register,
  login,
  profile,
  createReservation,
  getAllUsers,
  createSuite,
  getSuites,
};
