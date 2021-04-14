import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import List from "../components/list";

import "../css/home.css";

const Productos = () => {
  let history = useHistory();

  let [items, setItems] = useState([]);
  const getData = async () => {
    return await axios.get("http://localhost:5000/api/products/");
  };

  useEffect(async () => {
    let { data } = await getData();
    setItems(data);
  }, []);

  let handlePushHistory = (url) => {
    history.push(url);
  };

  return (
    <React.Fragment>
      <div className="flex-center">
        <button onClick={() => handlePushHistory("/AgregarProducto")}>
          Agregar Productos
        </button>
        <List items={items} producto={true} className="margin_spaces" />
      </div>
    </React.Fragment>
  );
};

export default Productos;
