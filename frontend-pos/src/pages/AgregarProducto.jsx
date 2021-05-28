import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import axios from "axios";

import "../css/producto.css";
import Row from "./../components/row";

function AgregarProducto({ show, setShow }) {

  // const [setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  let [product, setProduct] = useState({});

  const handleChange = (e) => {
    const auxProduct = { ...product };
    auxProduct[e.currentTarget.name] = e.currentTarget.value;
    setProduct(auxProduct);
  };

  const addProduct = () => {
    axios.post("http://localhost:5000/api/products/save", product);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default AgregarProducto;





//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton></Modal.Header>
//         <div>
//           <h1>AGREGAR PRODUCTO</h1>
//           <Row
//             label="ID"
//             name="_id"
//             value={product._id}
//             handleChange={handleChange}
//           />
//           <Row
//             label="Name"
//             name="name"
//             value={product._name}
//             handleChange={handleChange}
//           />
//           <Row
//             label="Unit Price"
//             name="unitPrice"
//             value={product.unitPrice}
//             handleChange={handleChange}
//           />
//           <Row
//             label="Category"
//             name="category"
//             value={product.category}
//             handleChange={handleChange}
//           />
//           <Row
//             label="Quantity"
//             name="quantity"
//             value={product.quantity}
//             handleChange={handleChange}
//           />
//         </div>
//         <div className="button-container">
//           <button className="button" onClick={addProduct}>
//             Agregar
//         </button>
//         </div>
//   );
// };

