// Shared validation utilities for checkout and forms
export const validateUKPostcode = (postcode: string): boolean => {
  const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  return ukPostcodeRegex.test(postcode.trim());
};

export const validateUKPhoneNumber = (phone: string): boolean => {
  const ukPhoneRegex = /^(?:\+44|0)(?:\d{10}|1\d{9}|2\d{9}|3\d{9}|7\d{9})$/;
  return ukPhoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return /^\d{13,19}$/.test(cleaned);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) return false;

  const [month, year] = expiryDate.split("/");
  const expiry = new Date(2000 + parseInt(year), parseInt(month));
  return expiry > new Date();
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateAddress1 = (address: string): boolean => {
  return address.trim().length >= 5 && /^[a-zA-Z0-9\s,.'\-()]+$/.test(address);
};

export const validateAddress2 = (address: string): boolean => {
  // Address 2 is optional, but if provided must be valid
  return (
    address === "" ||
    (address.trim().length >= 2 && /^[a-zA-Z0-9\s,.'\-()]+$/.test(address))
  );
};
