export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
};

export const formatPhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return "";
  const phone = phoneNumber.match(/\d+/g)?.join("");
  return `(${phone?.substring(0, 3)}) ${phone?.substring(3, 6)}-${phone?.substring(6)}`;
};
