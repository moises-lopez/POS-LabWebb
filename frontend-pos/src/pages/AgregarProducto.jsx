import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import axios from "axios";

import "../css/producto.css";
import Row from "./../components/row";

function AgregarProducto({ show, setShow }) {

  // const [setShow] = useState(false);
  //const reload=()=>window.location.reload();
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  let [product, setProduct] = useState({});
  
  const handleChange = (e) => {
    const auxProduct = { ...product };
    auxProduct[e.currentTarget.name] = e.currentTarget.value;
    setProduct(auxProduct);
    
  };

  const addProduct = () => {
    axios.post("http://localhost:5000/api/products/save", product);
    setShow(false);
    //reload();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row
            label="ID"
            name="_id"
            value={product._id}
            handleChange={handleChange}
          />
           <Row
            label="Nombre del producto"
            name="name"
            value={product._name}
            handleChange={handleChange}
          />
           <Row
            label="Precio por unidad"
            name="unitPrice"
            value={product.unitPrice}
            handleChange={handleChange}
          />
          <Row
            label="Categoría"
            name="category"
            value={product.category}
            handleChange={handleChange}
          />
          
          <Row
            label="Cantidad"
            name="quantity"
            value={product.quantity}
            handleChange={handleChange}
          />
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