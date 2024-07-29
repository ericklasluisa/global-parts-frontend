import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../auth/pages/Login";
import IniciarRuta from "../registrador/pages/IniciarRuta";
import RegistroRuta from "../registrador/pages/RegistroRuta";
import FinalizarViaje from "../registrador/pages/FinalizarViaje";
import FinalizarRuta from "../registrador/pages/FinalizarRuta";

import TablaAdmin from "../components/TablaAdmin/TablaAdmin";
import Notificaciones from "../components/TablaAdmin/Notificaciones";
import Novedad from "../components/TablaAdmin/Novedad";

import { useAuthStore } from "../auth/hooks/useAuthStore";
import { useRegistradorStore } from "../registrador/hooks/useRegistradorStore.js";
import { useEffect } from "react";

function AppRouter() {
  const { status, user, checkAuthToken } = useAuthStore();
  const { recuperarRecoleccion } = useRegistradorStore();

  useEffect(() => {
    checkAuthToken();
    if (user?.rol === "registrador") recuperarRecoleccion();
  }, [checkAuthToken, recuperarRecoleccion, user]);

  if (status === "checking") {
    return <h1>Cargando...</h1>;
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
          <Route path="/" element={<TablaAdmin />} />
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
