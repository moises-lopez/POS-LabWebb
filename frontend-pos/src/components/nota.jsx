import React, { Component } from "react";

import Item from "./item";

import "../css/compra.css";
import "../css/home.css";

const Nota = ({ items, total }) => {
  return (
    <React.Fragment>
      <div className="flex-center">
        <div className="cart margin_spaces">
          <table className="table">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Categoria</th>
            </tr>
            {items.map((item) => (
              <Item
                ID={item._id}
                nombre={item.name}
                precio={item.unitPrice}
                cantidad={item.quantity}
                categoria={item.category}
                producto={false}
              />
            ))}
          </table>
        </div>

        <div className="total total_size margin_spaces">
          <tr>
            <td>Subtotal:</td>
            <td>{total}</td>
          </tr>

          <tr>
            <td>Impuesto</td>
            <td>{total * 0.15}</td>
          </tr>

          <tr>
            <td>Total</td>
            <td>{total * 1.15}</td>
          </tr>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Nota;
