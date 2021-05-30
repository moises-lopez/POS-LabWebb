import React from "react";
import Item from "../components/item";

import "../css/compra.css";
import "../css/home.css";
import "../css/tablas.css";

import Table from 'react-bootstrap/Table'

const List = ({ items, producto }) => {
  return (
    <React.Fragment>
      <div className="container margin_spaces">
      <Table striped bordered hover>
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

        </Table>
      </div>
    </React.Fragment>
  );
};

export default List;
