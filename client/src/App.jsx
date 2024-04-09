import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmpleadosPostPage } from "./pages/Post/EmpleadosPostPage";
import { EmpleadosGetPage } from "./pages/Get/EmpleadosGetPage";
import ButtonAppBar from "./components/ButtonAppBar";
import { LoginPage } from "./pages/login/LoginPage";

console.log("Empleados");
export const App = () => {
  
  return (
    <BrowserRouter>
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/crear-empleados" element={<EmpleadosPostPage />} />
        <Route path="/mostrar-empleados" element={<EmpleadosGetPage />} />
      </Routes>
    </BrowserRouter>
  );
};
