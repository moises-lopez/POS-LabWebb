import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/home.css";

import Compra from "./pages/Compra";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";
import AgregarProducto from "./pages/AgregarProducto";
import TabsBar from "./components/tabsbar";
import EditarProducto from "./pages/EditarProducto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

function App() {
  let [currentTab, setCurrentTab] = useState(window.location.pathname);
  let history = useHistory();

  let handelTabChange = tab => {
    setCurrentTab(tab);
    history.push(tab);
  };

  return (
    <React.Fragment>
      <div className="flex-container">
        <TabsBar tab={currentTab} handelTabChange={handelTabChange} />
        <div className="tab_container flex-center">
          <div className="center_item">
            <Switch>
              <Route path="/Login" component={Login} />
              <Route path="/Registro" component={Registro} />
              <Route path="/Compra" component={Compra} />
              <Route path="/Productos" component={Productos} />
              <Route path="/Ventas" component={Ventas} />
              <Route path="/AgregarProducto" component={AgregarProducto} />
              <Route path="/EditarProducto" component={EditarProducto} />
              <Redirect from="/" to={"/Login"} />
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
