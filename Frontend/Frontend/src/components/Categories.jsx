import React, { useEffect, useState } from "react";
import axios from "axios";


const CategoriasComponent = ({ onChange }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:6001/categoria/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchData();
  }, [onChange]);

  return (
    <div>
      <select onChange={onChange} className="opt">
        <option value="">Categorias</option>
        <option value="*">Todas</option>
        {categorias.map((categoria, index) => (
          <option key={categoria.category_id} value={categoria.category_id}>{categoria.nameoll}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoriasComponent;
