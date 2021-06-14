import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constants.js";

import axios from "axios";

import "../css/producto.css";
function AgregarProducto({ show, setShow }) {
  const handleClose = () => setShow(false);

  const history = useHistory();
  useEffect(async () => {
    try {
      const response = await axios.get(`${API_URL}api/login/autorizacion`, {
        headers: {
          token: localStorage.getItem("TOKEN"),
        },
      });
      console.log(response.status);
    } catch (e) {
      console.log("loby");
      history.push("/Login");
    }
  }, []);

  const addProduct = async () => {
    const product = {
      _id: document.querySelector("#form-id").value,
      name: document.querySelector("#form-name").value,
      unitPrice: document.querySelector("#form-unit-price").value,
      category: document.querySelector("#form-category").value,
      quantity: document.querySelector("#form-quantity").value,
    };
    await axios.post(`${API_URL}api/products/save`, product);
    console.log("HOLA?", product);
    setShow(false);
    window.location.reload();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="form-id">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="_id" />
            </Form.Group>
            <Form.Group controlId="form-name">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control type="text" placeholder="Nombre del producto" />
            </Form.Group>
            <Form.Group controlId="form-unit-price">
              <Form.Label>Precio por unidad</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Precio por unidad"
              />
            </Form.Group>
            <Form.Group controlId="form-category">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" placeholder="Categoría" />
            </Form.Group>
            <Form.Group controlId="form-quantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="number" step="1" placeholder="Cantidad" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AgregarProducto;
