import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout } from "../../store/auth/authSlice";
import { authApi } from "../api/authApi";
import { useCallback } from "react";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ user, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post("/token", {
        username: user,
        password: password,
      });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({
          id_usuario: data.id,
          nombre_usuario: data.nombre_usuario,
          apellido_usuario: data.apellido_usuario,
          rol: data.rol,
        })
      );
    } catch (error) {
      console.log({ error });
      dispatch(onLogout("Credenciales incorrectas"));
    }
  };

  const checkAuthToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(onLogout());
      return;
    }

    try {
      const { data } = await authApi.post("/login");
      dispatch(
        onLogin({
          id_usuario: data.id,
          nombre_usuario: data.nombre_usuario,
          apellido_usuario: data.apellido_usuario,
          rol: data.rol,
        })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  }, [dispatch]);

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    checkAuthToken,
    startLogout,
  };
};
