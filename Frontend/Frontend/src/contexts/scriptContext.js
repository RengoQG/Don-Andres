import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const ScriptContext = createContext();

// Creamos un hook personalizado para acceder al contexto
export const useScriptContext = () => useContext(ScriptContext);

// Creamos el proveedor del contexto
export const ScriptProvider = ({ children }) => {
  const [loadedScripts, setLoadedScripts] = useState([]);

  // Función para añadir un script al estado
  const addScript = (src) => {
    setLoadedScripts((prevScripts) => [...prevScripts, src]);
  };

  // Devolvemos el proveedor del contexto, pasando el estado y la función para añadir scripts
  return (
    <ScriptContext.Provider value={{ loadedScripts, addScript }}>
      {children}
    </ScriptContext.Provider>
  );
};
