import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import axios from "axios";

import EditarProducto from "../pages/EditarProducto";

const Item = ({ ID, nombre, precio, cantidad, categoria, producto }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProduct = async () => {
    await axios.post(`http://localhost:5000/api/products/delete/${ID}`);
    window.location.reload();
  }

  let history = useHistory();
  let handlePushHistory = (url) => {
    history.push({ pathname: url, state: { id: ID } });
  };

  return (
    <tr>
      <td>{ID}</td>
      <td>{nombre}</td>
      <td>${parseFloat(precio).toFixed(2)}</td>
      <td>{cantidad}</td>
      <td>{categoria}</td>
      {producto ? (
        <React.Fragment>
          <td>
            <Button variant="primary" onClick={handleShow}>
              Editar
          </Button>
            <EditarProducto show={show} setShow={setShow} pid={ID} />
            {/* <Button variant="outline-info" onClick={(handleShow) => handlePushHistory("/EditarProducto")}>
              Editar 
            </Button> */}
          </td>
          <td>
            <Button variant="outline-info" onClick={deleteProduct}> Borrar </Button>
          </td>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </tr>
  );
};

export default Item;
