import React, { useState } from "react";
import axios from "axios";

import "../css/producto.css";
import Row from "./../components/row";

const AgregarProducto = () => {
  let [product, setProduct] = useState({});

  const handleChange = (e) => {
    const auxProduct = { ...product };
    auxProduct[e.currentTarget.name] = e.currentTarget.value;
    setProduct(auxProduct);
  };

  const addProduct = () => {
    axios.post("http://localhost:5000/api/products/save", product);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>AGREGAR PRODUCTO</h1>
        <Row
          label="ID"
          name="_id"
          value={product._id}
          handleChange={handleChange}
        />
        <Row
          label="Name"
          name="name"
          value={product._name}
          handleChange={handleChange}
        />
        <Row
          label="Unit Price"
          name="unitPrice"
          value={product.unitPrice}
          handleChange={handleChange}
        />
        <Row
          label="Category"
          name="category"
          value={product.category}
          handleChange={handleChange}
        />
        <Row
          label="Quantity"
          name="quantity"
          value={product.quantity}
          handleChange={handleChange}
        />
      </div>
      <div className="button-container">
        <button className="button" onClick={addProduct}>
          Agregar
        </button>
      </div>
    </React.Fragment>
  );
};

export default AgregarProducto;
