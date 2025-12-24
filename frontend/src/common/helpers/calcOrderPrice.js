export const calcOrderPrice = (expandedOrder) => {
  const pizzasPrice = expandedOrder.expandedPizzas.reduce((acc, pizza) => {
    return acc + pizza.price * pizza.quantity;
  }, 0);

  const miscPrice =
    expandedOrder.expandedMisc?.reduce((acc, misc) => {
      return acc + misc.data.price * misc.quantity;
    }, 0) ?? 0;

  return pizzasPrice + miscPrice;
};
