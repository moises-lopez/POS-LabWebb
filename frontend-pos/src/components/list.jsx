import React, { Component } from "react";
import Item from "../components/item";

import "../css/compra.css";
import "../css/home.css";

const List = ({ items, producto }) => {
  return (
    <React.Fragment>
      <div className="container margin_spaces">
        <table className="table">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoria</th>
            {producto ? (
              <React.Fragment>
                <th>Editar</th>
                <th>Borrar</th>
              </React.Fragment>
            ) : (
              <div />
            )}
          </tr>
          {items.map((item) => (
            <Item
              ID={item._id}
              nombre={item.name}
              precio={item.unitPrice}
              cantidad={item.quantity}
              categoria={item.category}
              producto={producto}
            />
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

export default List;
