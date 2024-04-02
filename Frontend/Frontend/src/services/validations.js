export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidName = (name) => {
    return name.trim() !== "" && /^[a-zA-Z\s]+$/.test(name);
  };
  
  export const isValidPhoneNumber = (phone) => {
    if (phone.length < 7 || phone.length > 15) {
      return false;
    }
  
    const regex = /^[0-9+()\s]+$/;
    if (!regex.test(phone)) {
      return false;
    }
  
    return /^\+?\d+$/.test(phone);
  };
  
  export const isValidPassword = (password) => {
    if (password.length < 8) {
      return false;
    }
  
    const containsNumber = /\d/.test(password);
    const containsUpperCase = /[A-Z]/.test(password);
  
    if (!containsNumber || !containsUpperCase) {
      return false;
    }
  
    return true;
  };

  export const isValidAddress = (address) => {
    if (!address.trim()) {
      return false;
    }
  
    if (address.length > 100) {
      return false; // Por ejemplo, limitar la dirección a 100 caracteres
    }
    
    return true;
  };