import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../auth/pages/Login";
import IniciarRuta from "../registrador/pages/IniciarRuta";
import RegistroRuta from "../registrador/pages/RegistroRuta";
import FinalizarViaje from "../registrador/pages/FinalizarViaje";
import FinalizarRuta from "../registrador/pages/FinalizarRuta";

import TablaAdmin from "../components/TablaAdmin/TablaAdmin";
import Dashboard from "../administrador/pages/Dashboard.jsx";
import Notificaciones from "../components/TablaAdmin/Notificaciones";
import Novedad from "../components/TablaAdmin/Novedad";

import { useAuthStore } from "../auth/hooks/useAuthStore";
import { useRegistradorStore } from "../registrador/hooks/useRegistradorStore.js";

function AppRouter() {
  const { status, user, checkAuthToken } = useAuthStore();
  const { recuperarRecoleccion } = useRegistradorStore();

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuthToken();
    };

    initializeAuth();
  }, [checkAuthToken]);

  useEffect(() => {
    if (status === "authenticated" && user?.rol === "registrador") {
      recuperarRecoleccion(user.id_usuario);
    }
  }, [status, user, recuperarRecoleccion]);

  if (status === "checking") {
    return (
      <div className="flex flex-row gap-4 mx-auto">
        <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  }

  if (status === "authenticated") {
    if (user?.rol === "registrador") {
      return (
        <Routes>
          <Route path="/" element={<IniciarRuta />} />
          <Route path="/ruta" element={<RegistroRuta />} />
          <Route path="/finalizar-viaje" element={<FinalizarViaje />} />
          <Route path="/finalizar-ruta" element={<FinalizarRuta />} />
        </Routes>
      );
    }

    if (user?.rol === "administrador") {
      return (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/novedad" element={<Novedad />} />
        </Routes>
      );
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
