export const normalizePhone = (phone) => {
  if (!phone) return phone;

  return phone.replace(/\D/g, "");
};
