import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";
import axios from "axios";

import List from "../components/list";
import Header from "../components/header";

import "../css/home.css";
import AgregarProducto from "./AgregarProducto";
import { API_URL } from "../constants.js";

const Productos = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [items, setItems] = useState([]);
  const getData = async () => {
    return await axios.get(`${API_URL}api/products/`);
  };
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await axios.get(`${API_URL}api/login/autorizacion`, {
        headers: {
          token: localStorage.getItem("TOKEN"),
        },
      });
      console.log(response.status);
    } catch (e) {
      console.log("loby");
      history.push("/Login");
    }
    const fetchData = async () => {
      let { data } = await getData();
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header currPage="Productos"></Header>
      <div className="main-content">
        <Button variant="primary" onClick={handleShow}>
          Agregar Producto
        </Button>
        <List items={items} producto={true} className="margin_spaces" />
      </div>
      <AgregarProducto show={show} setShow={setShow} />
    </React.Fragment>
  );
};

export default Productos;
