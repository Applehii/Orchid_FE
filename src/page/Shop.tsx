import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrchidCard from "../components/OrchidCard";
import Cart from "../components/Cart";
import "../styles/Shop.css";
import { ShoppingBag } from "lucide-react";
import { getOrchids } from "../service/orchidService";
import type { Orchid } from "../service/orchidService";

const ITEMS_PER_PAGE = 10;

const Shop: React.FC = () => {
  const [orchids, setOrchids] = useState<Orchid[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    { orchid: Orchid; quantity: number }[]
  >([]);

  useEffect(() => {
    const fetchOrchidData = async () => {
      try {
        setLoading(true);
        const data = await getOrchids({ page: 0, size: 100 });
        setOrchids(data.content || []);
      } catch (error) {
        console.error("Error fetching orchids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchidData();
  }, []);

  const handleAddToCart = (orchid: Orchid) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.orchid.orchidId === orchid.orchidId
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.orchid.orchidId === orchid.orchidId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { orchid, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (orchidId: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.orchid.orchidId === orchidId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (orchidId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.orchid.orchidId !== orchidId)
    );
  };

  const filteredAndSortedOrchids = orchids
    .filter(
      (orchid) =>
        orchid.orchidName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orchid.orchidDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.orchidName.localeCompare(b.orchidName)
          : b.orchidName.localeCompare(a.orchidName);
      } else {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
    });

  const totalPages = Math.ceil(
    filteredAndSortedOrchids.length / ITEMS_PER_PAGE
  );
  const paginatedOrchids = filteredAndSortedOrchids.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-wrapper">
      <motion.div
        className="shop-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header">
          <div className="header-content">
            <div className="welcome-section">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="welcome-title"
              >
                Luxury Orchid Collection
              </motion.h1>
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="welcome-subtitle"
              >
                Discover Nature's Most Exquisite Masterpieces
              </motion.h2>
            </div>
            <motion.div
              className="cart-container"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} className="cart-icon" />
              {cartItems.length > 0 && (
                <motion.span
                  className="cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </motion.span>
              )}
            </motion.div>
          </div>
        </div>

        <div className="search-sort-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search orchids by name or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="sort-controls">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "price")}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <motion.button
              className="sort-button"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </motion.button>
          </div>
        </div>

        {loading ? (
          <motion.div
            className="loading"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🌸
          </motion.div>
        ) : (
          <>
            <motion.div
              className="orchids-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence>
                {paginatedOrchids.map((orchid) => (
                  <OrchidCard
                    key={orchid.orchidId}
                    orchid={orchid}
                    onAddToCart={() => handleAddToCart(orchid)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`page-button ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            )}
          </>
        )}

        <Cart
          items={cartItems}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </motion.div>
    </div>
  );
};

export default Shop;
