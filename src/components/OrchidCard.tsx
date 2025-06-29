import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Orchid } from "../service/orchidService";
import { formatPrice } from "../utils/formatters";
import OrchidModal from "./OrchidModal";
import { Eye, ShoppingBag } from "lucide-react";

interface OrchidCardProps {
  orchid: Orchid;
  onAddToCart: () => void;
}

const OrchidCard: React.FC<OrchidCardProps> = ({ orchid, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        className="orchid-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="orchid-image-wrapper">
          <motion.div
            className="orchid-image-container"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={orchid.orchidUrl}
              alt={orchid.orchidName}
              className="orchid-image"
            />
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="overlay-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="action-button view-button"
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={20} />
                </motion.button>
                <motion.button
                  className="action-button cart-button"
                  onClick={onAddToCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={20} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div className="orchid-info">
          <h3 className="orchid-name">{orchid.orchidName}</h3>
          <p className="orchid-price">{formatPrice(orchid.price)} VND</p>
          <p className="orchid-description">
            {orchid.orchidDescription.length > 80
              ? `${orchid.orchidDescription.substring(0, 80)}...`
              : orchid.orchidDescription}
          </p>
        </motion.div>
      </motion.div>

      <OrchidModal
        orchid={orchid}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default OrchidCard;
