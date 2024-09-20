import { SuiteModel } from "../models/suites.model.js";

const createSuite = async (req, res) => {
  try {
    const { name, price, capacity, count, description, image_gallery } =
      req.body;

    if (
      !name ||
      !price ||
      !capacity ||
      !count ||
      !description ||
      !image_gallery
    ) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    // Verificar que image_gallery sea un array de URLs
    if (
      !Array.isArray(image_gallery) ||
      !image_gallery.every((url) => typeof url === "string")
    ) {
      return res
        .status(400)
        .json({ ok: false, message: "image_gallery must be an array of URLs" });
    }

    // Convertir image_gallery a una cadena JSON
    const imageGalleryJson = JSON.stringify(image_gallery);

    const suite = await SuiteModel.create({
      name,
      price,
      capacity,
      count,
      description,
      image_gallery: imageGalleryJson,
    });

    return res.status(201).json({ ok: true, message: suite });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const AdminController = {
    createSuite,
}