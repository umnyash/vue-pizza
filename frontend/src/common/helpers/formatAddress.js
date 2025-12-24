export const formatAddress = (address) => {
  const formattedFlat = address.flat ? `${", "}кв. ${address.flat}` : "";

  return `${address.street}, д. ${address.building}${formattedFlat}`;
};
