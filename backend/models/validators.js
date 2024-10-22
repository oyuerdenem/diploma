// validators.js

// Regular expression for phone number validation (8-digit)
export const phoneNumberRegex = /^[0-9]{8}$/; 

// Regular expression for email validation
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

export const cuisineNameRegex = /^[a-zA-Z\s]{2,50}$/; // Allows letters and spaces, between 2 and 50 characters

export const menuItemNameRegex = /^[a-zA-Z0-9\s]{2,50}$/; // Allows alphanumeric characters and spaces, between 2 and 50 characters


// Function to validate phone number
export const validatePhoneNumber = (phoneNumber) => {
  return phoneNumberRegex.test(phoneNumber);
};

// Function to validate email
export const validateEmail = (email) => {
  return emailRegex.test(email);
};
