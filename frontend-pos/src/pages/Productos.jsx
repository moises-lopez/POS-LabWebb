import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { useHistory } from "react-router-dom";
import axios from "axios";

import List from "../components/list";
import Header from "../components/header";

import "../css/home.css";
import AgregarProducto from "./AgregarProducto";

const Productos = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();

  let [items, setItems] = useState([]);
  const getData = async () => {
    return await axios.get("http://localhost:5000/api/products/");
  };

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getData();
      setItems(data);
    }
    fetchData()
  }, []);

  let handlePushHistory = (url) => {
    history.push(url);
  };

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
    </React.Fragment >
  );
};

export default Productos;
