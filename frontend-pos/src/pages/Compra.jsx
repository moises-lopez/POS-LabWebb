import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Nota from "../components/nota";
import List from "../components/list";
import Header from '../components/header'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Alert from 'react-bootstrap/Alert'

import "../css/compra.css";
import "../css/home.css";

const Compra = () => {
  let [keyword, setKeyword] = useState("");
  let [total, setTotal] = useState(0);
  let [items, setItems] = useState([]);

  let [selectedItems, setSelectedItems] = useState([]);

  let mensajeError = ''

  const calculateTotal = useCallback(() => {
    let auxTotal = 0;
    selectedItems.forEach((item) => {
      auxTotal += item.unitPrice * item.quantity;
    });
    setTotal(auxTotal);
  }, [selectedItems]);

  useEffect(() => {
    calculateTotal();
  }, [selectedItems, calculateTotal]);

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

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const showAlert = (msg) => {
    const alerta = document.querySelector('#alerta')
    alerta.textContent = msg
    alerta.classList.remove('d-none');
    setTimeout(() => {
      alerta.classList.add('d-none')
    }, 3000);
  }

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      let idEntered = e.target.value;
      let newItems = [...selectedItems];
      let { data } = await axios.get(
        `http://localhost:5000/api/products/${idEntered}`
      );
      if (!data.length) {
        e.target.value = ''
        showAlert(`ID inválido`);
        return;
      }
      data = data[0];

      if (!selectedItems.some((e) => e._id === idEntered)) {
        // console.log(data)
        newItems.push({
          _id: data._id,
          name: data.name,
          unitPrice: data.unitPrice,
          category: data.category,
          quantity: 1,
        });
      } else {
        let index = newItems.findIndex((element) => element._id === idEntered);
        if (data.quantity === newItems[index].quantity) {
          showAlert(`No hay suficiente producto en el inventario`)
          return
        }
        newItems[index].quantity++;
      }
      setSelectedItems(newItems);
    }
  };
  const handleVenta = () => {
    let dataSale = {
      total: total,
      arrayProducts: selectedItems,
    };
    axios.post("http://localhost:5000/api/sales/save", dataSale);
  };

  const clearInput = () => {
    document.querySelector('#id-input').value = ''
  }

  return (
    <React.Fragment>
      <Header currPage="Compra"></Header>
      <Alert variant="danger" id="alerta" className="d-none">
        {/* {mensajeError} */}
      </Alert>
      <Container className="main-content">
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                id="id-input"
                placeholder="ID del artículo"
                aria-label="ID del artículo"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <InputGroup.Append>
                <Button variant="danger" onClick={clearInput}>X</Button>
              </InputGroup.Append>
            </InputGroup>
            <List items={items} producto={false} className="margin_spaces" />
          </Col>
          <Col>
            <Nota items={selectedItems} total={total} />
            {/* <input
              type="button"
              onClick={handleVenta}
              className="hacer-compra-btn"
              value="Hacer Compra"
            /> */}
            <Button variant="info" onClick={handleVenta}>Hacer compra</Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Compra;
