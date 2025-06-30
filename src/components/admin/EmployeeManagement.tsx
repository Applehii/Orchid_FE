import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllEmployees } from "../../service/employeeService";
import type { Employee as EmployeeApi } from "../../service/employeeService";

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeApi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee] = useState<EmployeeApi | null>(null);

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

  useEffect(() => {
    getAllEmployees().then(setEmployees);
  }, []);

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Account Management</h2>
      </div>

      <motion.table
        className="management-table"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <motion.tr
              key={employee.accountId}
              variants={rowVariants}
              whileHover={{ backgroundColor: "rgba(155, 77, 255, 0.05)" }}
            >
              <td>{employee.accountId}</td>
              <td>{employee.accountName}</td>
              <td>{employee.email}</td>
              <td>{employee.roleName}</td>
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
              <h3>{currentEmployee ? "Edit Employee" : "Add Employee"}</h3>
              {/* Form content will be added later */}
              <div className="modal-buttons">
                <motion.button
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
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeManagement;
