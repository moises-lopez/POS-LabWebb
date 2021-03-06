import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constants.js";

const Ventas = () => {
  let [ventas, setVentas] = useState([]);
  let [loading, setLoading] = useState(true);
  let [ventasHoy, setVentasHoy] = useState(0);
  const history = useHistory();

  const getData = async () => {
    return await axios.get(`${API_URL}api/sales/`);
  };

  const getVentasHoy = async () => {
    return await axios.get(`${API_URL}api/sales/salesToday`);
  };

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
    async function fetchData() {
      setLoading(true);
      let { data } = await getData();
      console.log(data);
      setVentas(data.reverse());
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  }

  const handleVentasHoy = async () => {
    setLoading(true);
    let { data } = await getVentasHoy();
    console.log(data);
    setVentasHoy(data);
    setLoading(false);
  };

  const ventasComponent = () => {
    return (
      <React.Fragment>
        Estas son las ventas de hoy = {ventasHoy.toFixed(2)}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Header currPage="Historial de Ventas"></Header>
      <div className="corte">
        <Button
          onClick={() => handleVentasHoy()}
          variant="contained"
          color="primary"
        >
          Hacer corte HOY
        </Button>
        {ventasHoy && ventasComponent()}
      </div>
      <div className="container margin_spaces">
        <table className="table">
          <tr>
            <th>Fecha de compra</th>
            <th>Total</th>
            <th>N?? de productos</th>
            <th>Productos</th>
          </tr>
          {ventas.map((venta) => (
            <tr>
              <td>{venta.createdAt}</td>
              <td>${venta.total.toFixed(2)}</td>
              <td>{venta.arrayProducts.length}</td>
              <td>
                {venta.arrayProducts.map((articulo) => (
                  <div>
                    <b>Nombre:</b> {articulo.name} <b>Cantidad :</b>
                    {articulo.quantity}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

export default Ventas;
