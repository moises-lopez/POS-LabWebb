import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Nota from "../components/nota";
import List from "../components/list";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constants.js";

import "../css/compra.css";
import "../css/home.css";

const Compra = () => {
  let [keyword, setKeyword] = useState("");
  let [total, setTotal] = useState(0);
  let [items, setItems] = useState([]);

  let [selectedItems, setSelectedItems] = useState([]);

  const calculateTotal = useCallback(() => {
    let auxTotal = 0;
    selectedItems.forEach((item) => {
      auxTotal += item.unitPrice * item.quantity;
    });
    setTotal(auxTotal);
  }, [selectedItems]);

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
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedItems, calculateTotal]);

  const getData = async () => {
    return await axios.get(`${API_URL}api/products/`);
  };

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getData();
      setItems(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      let idEntered = e.target.value;
      let newItems = [...selectedItems];
      setKeyword("");

      if (!selectedItems.some((e) => e._id === idEntered)) {
        let { data } = await axios.get(`${API_URL}api/products/${idEntered}`);
        if (!data.length) {
          e.target.value = "";
          console.error("Invalid ID");
          return;
        }
        data = data[0];
        newItems.push({
          _id: data._id,
          name: data.name,
          unitPrice: data.unitPrice,
          category: data.category,
          quantity: 1,
        });
      } else {
        let index = newItems.findIndex((element) => element._id === idEntered);
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
    axios.post(`${API_URL}api/sales/save`, dataSale);
    setKeyword("");
    setSelectedItems([]);
  };

  return (
    <React.Fragment>
      <Header currPage="Compra"></Header>
      <Container className="main-content">
        <Row>
          <Col>
            <input
              id="cityname"
              type="text"
              value={keyword}
              className="form-control"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Escanee o busque artículo"
            />
            <List items={items} producto={false} className="margin_spaces" />
          </Col>
          <Col>
            <Nota items={selectedItems} total={total} />
            <Button variant="info" onClick={handleVenta}>
              Hacer compra
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Compra;
