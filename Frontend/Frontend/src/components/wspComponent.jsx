import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import '../EstilosComponentes/wspStyles.css';

const WhatsAppButton = () => {
  const phoneNumber = "573006236655"; // Aquí colocas el número de teléfono que deseas utilizar
  const baseUrl = "https://horizonsolutions.com.co/";

  const handleClick = () => {
    const message = "Hola, deseo más información sobre tus productos: " + baseUrl;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&app_absent=0`, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <FaWhatsapp className="whatsapp-icon" />
      <span>¡Contáctanos por WhatsApp!</span>
    </div>
  );
};

export default WhatsAppButton;
