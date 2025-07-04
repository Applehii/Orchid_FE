import api from "./axiosInstance"; // Import đúng cái instance bạn vừa cho mình xem
import type { Orchid } from "../service/orchidService";

interface CartItem {
  orchidId: string;
  quantity: number;
}

export const checkout = async (
  accountId: string,
  cartItems: { orchid: Orchid; quantity: number }[]
) => {
  const payload: CartItem[] = cartItems.map((item) => ({
    orchidId: item.orchid.orchidId!,
    quantity: item.quantity,
  }));

  return await api.post(`/orders/checkout/${accountId}`, payload);
};
