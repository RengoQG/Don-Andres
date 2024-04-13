import React from 'react';
// import '../EstilosComponentes/modal.css'; // Estilos de la modal


const ModalProducto = ({ producto, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{producto.name}</h2>
        <img src={producto.image} alt={producto.name} />
        <p>{producto.description}</p>
        <p>${producto.price}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalProducto;
