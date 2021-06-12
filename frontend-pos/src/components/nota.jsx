import React from "react";

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
            <td>${(total / 1.16).toFixed(2)}</td>
          </tr>

          <tr>
            <td>IVA</td>
            <td>${(total * 0.137931).toFixed(2)}</td>
          </tr>

          <tr>
            <td>Total</td>
            <td>${(total).toFixed(2)}</td>
          </tr>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Nota;
