import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "./css/home.css";

import Compra from "./pages/Compra";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";
import AgregarProducto from "./pages/AgregarProducto";
import TabsBar from "./components/tabsbar";
import EditarProducto from "./pages/EditarProducto";
function App() {
  let [currentTab, setCurrentTab] = useState("/Compra");
  let history = useHistory();

  let handelTabChange = (tab) => {
    setCurrentTab(tab);
    history.push(tab);
  };

  return (
    <React.Fragment>
      <TabsBar tab={currentTab} handelTabChange={handelTabChange} />
      <div className="tab_container flex-center">
        <div className="center_item">
          <Switch>
            <Route path="/Compra" component={Compra} />
            <Route path="/Productos" component={Productos} />
            <Route path="/Ventas" component={Ventas} />
            <Route path="/AgregarProducto" component={AgregarProducto} />
            <Route path="/EditarProducto" component={EditarProducto} />

            <Redirect from="/" to={currentTab} />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
