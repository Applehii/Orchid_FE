import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Orchid } from "../types/orchid";
import { formatPrice } from "../utils/formatters";
import { Thermometer, Droplets, Sun, Leaf, X, ShoppingBag } from "lucide-react";
import "../styles/OrchidModal.css";

interface OrchidModalProps {
  orchid: Orchid;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const OrchidModal: React.FC<OrchidModalProps> = ({
  orchid,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="modal-grid">
            <motion.div
              className="modal-image-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={orchid.imageUrl}
                alt={orchid.name}
                className="modal-image"
              />
            </motion.div>

            <motion.div
              className="modal-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="modal-title">{orchid.name}</h2>
              <div className="modal-price">{formatPrice(orchid.price)} VND</div>

              <div className="modal-description">
                <h3>About this Orchid</h3>
                <p>{orchid.description}</p>
              </div>

              <div className="modal-details">
                <h3>Care Guide</h3>
                <div className="care-grid">
                  <div className="care-item">
                    <Thermometer size={20} />
                    <span>18-25°C</span>
                  </div>
                  <div className="care-item">
                    <Droplets size={20} />
                    <span>Once weekly</span>
                  </div>
                  <div className="care-item">
                    <Sun size={20} />
                    <span>Indirect light</span>
                  </div>
                  <div className="care-item">
                    <Leaf size={20} />
                    <span>Orchid mix</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <motion.button
                  className="add-to-cart-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onAddToCart();
                    onClose();
                  }}
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrchidModal;
