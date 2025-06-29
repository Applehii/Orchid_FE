import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Orchid } from "../service/orchidService";
import { formatPrice } from "../utils/formatters";
import { Plus, Minus, Trash2 } from "lucide-react";
import "../styles/Cart.css";
import { checkout } from "../service/checkoutService";
import { getAccountIdFromToken } from "../utils/authUtils";
interface CartProps {
  items: { orchid: Orchid; quantity: number }[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (orchidId: number, change: number) => void;
  onRemoveItem: (orchidId: number) => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.orchid.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cart-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="cart-panel"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cart-header">
            <h2>Your Cart 🛒</h2>
            <button className="cart-close" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="cart-items">
            {items.length === 0 ? (
              <motion.div
                className="cart-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="cart-empty-icon">🌺</span>
                <p>Your cart is empty</p>
                <button className="continue-shopping" onClick={onClose}>
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <AnimatePresence>
                {items.map(({ orchid, quantity }) => (
                  <motion.div
                    key={orchid.orchidId}
                    className="cart-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="cart-item-image-wrapper">
                      <img
                        src={orchid.orchidUrl}
                        alt={orchid.orchidName}
                        className="cart-item-image"
                      />
                    </div>

                    <div className="cart-item-details">
                      <h3>{orchid.orchidName}</h3>
                      <p className="cart-item-price">
                        {formatPrice(orchid.price)} VND
                      </p>

                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              onUpdateQuantity(orchid.orchidId, -1)
                            }
                            disabled={quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>

                          <span className="quantity-number">{quantity}</span>

                          <button
                            onClick={() => onUpdateQuantity(orchid.orchidId, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          className="remove-item"
                          onClick={() => onRemoveItem(orchid.orchidId)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {items.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">{formatPrice(total)} VND</span>
              </div>
              <motion.button
                className="checkout-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  const accountId = getAccountIdFromToken();
                  if (!accountId) {
                    alert("You need to login to checkout!");
                    return;
                  }

                  try {
                    await checkout(accountId, items);
                    alert("Order placed successfully!");
                    onClose();
                  } catch (error) {
                    console.error(error);
                    alert("Checkout failed!");
                  }
                }}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;
