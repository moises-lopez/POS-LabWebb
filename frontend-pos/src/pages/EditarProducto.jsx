import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


import axios from "axios";


const EditarProducto = ({ show, setShow }) => {
  const location = useLocation();
  let [product, setProduct] = useState({});
  const handleClose = () => setShow(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let { data } = await axios.get(
  //       `http://localhost:5000/api/products/${location.state.id}`
  //     );
  //     console.log(data[0]);
  //     setProduct(data[0]);
  //   }
  //   fetchData()
  // }, [location]);

  const handleChange = (e) => {
    const auxProduct = { ...product };
    auxProduct[e.currentTarget.name] = e.currentTarget.value;
    setProduct(auxProduct);
  };

  const editProduct = () => {
    axios.post(
      `http://localhost:5000/api/products/update/${product._id}`,
      product
    );
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
          <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>

        <Modal.Body>
      <React.Fragment>
      <React.Fragment>

        <input
          id="id"
          type="text"
          value={product._id}
          className="form-control"
          name="_id"
          onChange={handleChange}
        />
        <input
          id="name"
          type="text"
          value={product.name}
          className="form-control"
          name="name"
          onChange={handleChange}
        />
        <input
          id="unitPrice"
          type="text"
          value={product.unitPrice}
          className="form-control"
          name="unitPrice"
          onChange={handleChange}
        />
        <input
          id="category"
          type="text"
          value={product.category}
          className="form-control"
          name="category"
          onChange={handleChange}
        />
        <input
          id="quantity"
          type="text"
          value={product.quantity}
          className="form-control"
          name="quantity"
          onChange={handleChange}
        />
        {/* <button onClick={editProduct}>Send</button> */}
      </React.Fragment>
    </React.Fragment>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancelar
        </Button>
        <Button variant="primary" onClick={editProduct}>
          Agregar
          </Button>
          </Modal.Footer>
      
    </Modal>
  ); 
};

export default EditarProducto;
