import React from "react";
import Item from "../components/item";

import "../css/compra.css";
import "../css/home.css";

const List = ({ items, producto }) => {
  return (
    <React.Fragment>
      <div className="container margin_spaces">
        <table className="table">
          <thead>
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
          </thead>
          <tbody>
            {items.map((item) => (
              <Item
                key={item._id}
                ID={item._id}
                nombre={item.name}
                precio={item.unitPrice}
                cantidad={item.quantity}
                categoria={item.category}
                producto={producto}
              />
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default List;
