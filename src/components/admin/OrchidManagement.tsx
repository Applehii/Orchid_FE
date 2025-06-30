import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaPlus } from "react-icons/fa";
import {
  getOrchids,
  createOrchid,
  updateOrchid,
  deleteOrchid, // Thêm import hàm xóa
} from "../../service/orchidService";
import type { Orchid as OrchidApi } from "../../service/orchidService";

const OrchidManagement: React.FC = () => {
  const [orchids, setOrchids] = useState<OrchidApi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrchid, setCurrentOrchid] = useState<OrchidApi | null>(null);

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleEdit = (orchid: OrchidApi) => {
    setCurrentOrchid(orchid);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteOrchid(String(id)); // Gọi hàm xóa FE
    setOrchids((prev) => prev.filter((orchid) => orchid.orchidId !== id));
  };

  const handleSave = async (orchid: OrchidApi) => {
    if (orchid.orchidId) {
      // Update
      const updated = await updateOrchid(String(orchid.orchidId), orchid);
      setOrchids((prev) =>
        prev.map((o) => (o.orchidId === updated.orchidId ? updated : o))
      );
    } else {
      // Add
      const created = await createOrchid(orchid);
      setOrchids((prev) => [...prev, created]);
    }
    setIsModalOpen(false);
    setCurrentOrchid(null);
  };

  useEffect(() => {
    getOrchids({ page: 0, size: 100 }).then((data) =>
      setOrchids(data.content || [])
    );
  }, []);

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Orchid Management</h2>
        <motion.button
          className="add-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentOrchid(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> Add Orchid
        </motion.button>
      </div>
      <motion.table
        className="management-table"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orchids.map((orchid) => (
            <motion.tr
              key={orchid.orchidId}
              variants={rowVariants}
              whileHover={{ backgroundColor: "rgba(155, 77, 255, 0.05)" }}
            >
              <td>
                <img
                  src={orchid.orchidUrl}
                  alt={orchid.orchidName}
                  className="orchid-thumbnail"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </td>
              <td>{orchid.orchidName}</td>
              <td>{orchid.category?.categoryName || ""}</td>
              <td>{orchid.price.toLocaleString()} VND</td>
              <td>{orchid.orchidDescription}</td>
              <td className="action-buttons">
                <motion.button
                  className="edit-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(orchid)}
                >
                  <FaEdit />
                </motion.button>
                {/* Đã loại bỏ nút xóa */}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <h3>{currentOrchid ? "Edit Orchid" : "Add Orchid"}</h3>
              <form
                className="orchid-modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(currentOrchid!);
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={currentOrchid?.orchidName || ""}
                  onChange={(e) =>
                    setCurrentOrchid((o) => ({
                      ...o!,
                      orchidName: e.target.value,
                    }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Category ID"
                  value={currentOrchid?.category?.categoryId || ""}
                  onChange={(e) =>
                    setCurrentOrchid((o) => ({
                      ...o!,
                      category: {
                        categoryId: Number(e.target.value),
                        categoryName: o?.category?.categoryName || "",
                      },
                    }))
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={currentOrchid?.price || ""}
                  onChange={(e) =>
                    setCurrentOrchid((o) => ({
                      ...o!,
                      price: Number(e.target.value),
                    }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={currentOrchid?.orchidUrl || ""}
                  onChange={(e) =>
                    setCurrentOrchid((o) => ({
                      ...o!,
                      orchidUrl: e.target.value,
                    }))
                  }
                  required
                />
                <textarea
                  placeholder="Description"
                  value={currentOrchid?.orchidDescription || ""}
                  onChange={(e) =>
                    setCurrentOrchid((o) => ({
                      ...o!,
                      orchidDescription: e.target.value,
                    }))
                  }
                  required
                />
                <div className="modal-buttons">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="save-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                  >
                    Save
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrchidManagement;
