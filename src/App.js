import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Tables from "./components/form";
import AuthProvider from "./context/AuthContext";
import ProtectRoute from "./context/ProtectRoute";
import Home, { MenuDefault } from "./components/home";
import Dangkybaohiem from "./components/tinhbaohiem";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectRoute>
              <MenuDefault />
            </ProtectRoute>
          }
        />

        <Route path="/khaibao" element={<Tables />} />
        <Route path="/dangkybaohiem" element={<Dangkybaohiem />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
