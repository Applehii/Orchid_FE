import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Shop from "./page/Shop";
import Login from "./page/Login";
import Admin from "./page/Admin";
import Orders from "./page/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./page/Unauthorized";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/401" element={<Unauthorized />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
