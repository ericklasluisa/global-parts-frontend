import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/pages/Login";
import IniciarRuta from "../registrador/pages/IniciarRuta";
import RegistroRuta from "../registrador/pages/RegistroRuta";
import FinalizarViaje from "../registrador/pages/FinalizarViaje";
import FinalizarRuta from "../registrador/pages/FinalizarRuta";
import { useAuthStore } from "../auth/hooks/useAuthStore";
import { useRegistradorStore } from "../registrador/hooks/useRegistradorStore.js";
import { useEffect } from "react";

function AppRouter() {
  const { status, user, checkAuthToken } = useAuthStore();
  const { recuperarRecoleccion } = useRegistradorStore();

  useEffect(() => {
    checkAuthToken();
    recuperarRecoleccion();
  }, [checkAuthToken, recuperarRecoleccion]);

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
          <Route path="/" element={<h1>Páginas de Admin</h1>} />
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
