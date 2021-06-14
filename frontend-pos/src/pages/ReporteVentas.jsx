import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Header from '../components/header'
import { ResponsiveBar } from "@nivo/bar";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constants.js";

const ReporteVentas = () => {
  let [data, setData] = useState([]);
  let [currentWeek, setCurrentWeek] = useState(0);
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
    await getDate(0);
  }, []);
  const getDate = async (newWeek) => {
    let { data: request } = await axios.get(`${API_URL}api/sales/salesWeekly`, {
      params: {
        currentWeek: newWeek,
      },
    });
    setData(request);
  };
  const myStyle = {
    width: 900,
    height: 900,
  };

  const handleButton = async (displacement) => {
    setCurrentWeek(currentWeek + displacement);
    await getDate(currentWeek + displacement);
  };

  return (
    <div style={myStyle}>
      <Header currPage="Reporte semanal"></Header>
      <Button onClick={() => handleButton(1)}>Semana anterior</Button>
      <Button onClick={() => handleButton(-1)}>Semana Posterior</Button>

      <ResponsiveBar
        data={data}
        keys={["ventas"]}
        indexBy="fecha"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Fecha",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Ventas",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default ReporteVentas;
