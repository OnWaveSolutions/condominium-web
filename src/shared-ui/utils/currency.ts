import { Condominium } from "../models/condominium";

export const currencyFormat = ({ currencySymbol }: Condominium) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return (amount: number) => formatter.format(amount || 0) + currencySymbol;
};
