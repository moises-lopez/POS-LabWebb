const express = require("express");
const Usuarios = require("../models/usuarios.model");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.post("/login", async function (req, res) {
  let query = {
      email: req.body.email,
      contrasenia: req.body.contrasenia,
    };


    const usuario = await Usuarios.find(
      {
        email:req.body.email
      }
    );


    if (usuario.length == 0) {
      return res.status(400).send("Email no existe");
    }

    const validPass = await bcrypt.compare(
      req.body.contrasenia,
      usuario[0].contrasenia
    );

    if (!validPass) {
      return res.status(400).send("Contraseña incorrecta");
    }
    const token = jwt.sign({ email: usuario[0].email }, process.env.TOKEN_SECRET);

    res.send(token);
});


router.post("/registro", async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashcontrasenia = await bcrypt.hash(req.body.contrasenia, salt);
    let usuario = {
      email: req.body.email,
      contrasenia: hashcontrasenia,
    };
    const newUsuario = new Usuarios(usuario);
    await newUsuario.save(usuario);
});

module.exports = router;
