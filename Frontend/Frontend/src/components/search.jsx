import React, { useState } from 'react';
import { FaSearch, FaDesktop, FaKeyboard, FaGamepad, FaChevronDown } from 'react-icons/fa';
import '../EstilosComponentes/search.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    // Función para manejar el cambio de categoría seleccionada
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        // Aquí podrías ejecutar alguna acción adicional dependiendo de la categoría seleccionada
    };

    return (
        <div className='search__main'>
            <div className='buscador'>
                <input type="text" placeholder="Buscar productos..." className="search-input" onChange={handleInputChange} />
                <button type="button" className="search-button" onClick={handleSubmit}><FaSearch /></button>
            </div>
        </div>
    );
};

export default SearchBar;
