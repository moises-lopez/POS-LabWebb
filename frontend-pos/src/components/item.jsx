import React from "react";
import { useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button'

const Item = ({ ID, nombre, precio, cantidad, categoria, producto }) => {
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
            <Button variant="outline-info" onClick={() => handlePushHistory("/EditarProducto")}>
              Editar
            </Button>
          </td>
          <td>
            <Button variant="outline-info"> Borrar </Button>
          </td>
        </React.Fragment>
      ) : (
        <div />
      )}
    </tr>
  );
};

export default Item;
