import React, { Component } from "react";
import { useHistory } from "react-router-dom";

const Item = ({ ID, nombre, precio, cantidad, categoria, producto }) => {
  let history = useHistory();
  let handlePushHistory = (url) => {
    history.push({ pathname: url, state: { id: ID } });
  };
  return (
    <tr>
      <td>{ID}</td>
      <td>{nombre}</td>
      <td>{precio}</td>
      <td>{cantidad}</td>
      <td>{categoria}</td>
      {producto ? (
        <React.Fragment>
          <td>
            <button onClick={() => handlePushHistory("/EditarProducto")}>
              Editar
            </button>
          </td>
          <td>
            <button> Borrar </button>
          </td>
        </React.Fragment>
      ) : (
        <div />
      )}
    </tr>
  );
};

export default Item;
