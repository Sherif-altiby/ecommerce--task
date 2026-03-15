
/** Format card number into groups of 4: "4242424242424242" → "4242 4242 4242 4242" */
export const formatCard = (v: string): string =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

/** Format expiry to MM/YY: "1224" → "12/24" */
export const formatExpiry = (v: string): string => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};