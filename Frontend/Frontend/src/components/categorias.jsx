import React, { useState } from 'react';

const CategoriaSelector = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  return (
    <div>
      <label htmlFor="categoria">Selecciona una categoría:</label>
      <select id="categoria" value={categoriaSeleccionada} onChange={handleCategoriaChange}>
        <option value="">Selecciona una categoría</option>
        <option value="teclados">Teclados</option>
        <option value="computadores">Computadores</option>
      </select>
      {categoriaSeleccionada && (
        <p>Has seleccionado la categoría: {categoriaSeleccionada}</p>
      )}
    </div>
  );
};

export default CategoriaSelector;
