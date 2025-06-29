import axios from "axios";
import type { Orchid } from "../service/orchidService";

interface CartItem {
  orchidId: number;
  quantity: number;
}

export const checkout = async (accountId: number, cartItems: { orchid: Orchid; quantity: number }[]) => {
  const payload: CartItem[] = cartItems.map(item => ({
    orchidId: item.orchid.orchidId!,
    quantity: item.quantity
  }));

  return await axios.post(`/orders/checkout/${accountId}`, payload);
};
