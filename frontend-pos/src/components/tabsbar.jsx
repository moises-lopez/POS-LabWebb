import React from "react";

const TabsBar = ({tab, handelTabChange}) => {
  let compra = '/Compra'
  let productos = '/Productos'
  let ventas = '/Ventas'
  return (
    <ul className="tabs">
      <li className={tab == compra ? 'active' : '' } rel="tab1" onClick={() => handelTabChange(compra)}>
        Compra
      </li>
      <li className={tab == productos ? 'active' : '' } rel="tab2" onClick={() => handelTabChange(productos)}>
        Productos
        </li>
      <li className={tab == ventas ? 'active' : '' } rel="tab3" onClick={() => handelTabChange(ventas)}>
        Ventas
        </li>
    </ul>
  );
};

export default TabsBar;
