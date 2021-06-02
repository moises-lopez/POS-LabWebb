import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


import axios from "axios";


const EditarProducto = ({ show, setShow, pid }) => {
  const location = useLocation();
  // let [product, setProduct] = useState({});
  const handleClose = () => setShow(false);
  let [productData, setProductData] = useState([])

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

  // const handleChange = (e) => {
  //   const auxProduct = { ...product };
  //   auxProduct[e.currentTarget.name] = e.currentTarget.value;
  //   setProduct(auxProduct);
  // };

  const getProductInfo = async () => {
    return await axios.get(`http://localhost:5000/api/products/${pid}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getProductInfo();
      setProductData(data[0]);
    }
    fetchData()
  }, [])

  const editProduct = () => {
    const product = {
      '_id': document.querySelector('#form-id').value,
      'name': document.querySelector('#form-name').value,
      'unitPrice': document.querySelector('#form-unit-price').value,
      'category': document.querySelector('#form-category').value,
      'quantity': document.querySelector('#form-quantity').value,
    }
    axios.post(
      `http://localhost:5000/api/products/update/${pid}`,
      product
    );
    setShow(false)
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="form-id">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" defaultValue={productData._id} />
          </Form.Group>
          <Form.Group controlId="form-name">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control type="text" defaultValue={productData.name} />
          </Form.Group>
          <Form.Group controlId="form-unit-price">
            <Form.Label>Precio por unidad</Form.Label>
            <Form.Control type="number" step="0.01" defaultValue={productData.unitPrice} />
          </Form.Group>
          <Form.Group controlId="form-category">
            <Form.Label>Categoría</Form.Label>
            <Form.Control type="text" defaultValue={productData.category} />
          </Form.Group>
          <Form.Group controlId="form-quantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type="number" step="1" defaultValue={productData.quantity} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={editProduct}>
          Guardar
          </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default EditarProducto;
