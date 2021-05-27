const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UsuariosSchema = new Schema(
  {
    email: { type: String, required: true },
    contrasenia: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Usuarios = mongoose.model("Usuarios", UsuariosSchema);

module.exports = Usuarios;
