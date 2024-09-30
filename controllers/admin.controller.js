import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { SuiteModel } from "../models/suites.model.js";
import fetch from "node-fetch"; // Asegúrate de tener node-fetch instalado
import FormData from "form-data"; // Importa FormData

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dctc1rhlx/image/upload";
const cloudinaryPreset = "Purple";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const createSuite = async (req, res) => {
  try {
    const { name, price, capacity, count, description } = req.body;
    const files = req.files;

    console.log(files);
    console.log(name);

    if (!files || files.length === 0) {
      return res.status(400).json({ ok: false, message: "No files uploaded" });
    }

    files.forEach((file) => {
      console.log(`File: ${file.originalname}, Size: ${file.size}`);
    });

    const imageUrls = await Promise.all(
      files.map(async (file) => {
        if (!file || !file.buffer) {
          throw new Error("File or file buffer is undefined");
        }

        const formData = new FormData();
        formData.append("file", file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
        formData.append("upload_preset", cloudinaryPreset);
        formData.append("folder", "HOTELND");

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
          headers: formData.getHeaders(), // Asegúrate de incluir los encabezados correctos
        });

        if (!response.ok) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const data = await response.json();
        return data.secure_url;
      })
    );

    console.log(imageUrls);

    /*const suite = await SuiteModel.create({
      name,
      price,
      capacity,
      count,
      description,
    });

    return res.status(201).json({ ok: true, message: suite });*/
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const AdminController = {
  createSuite,
};
