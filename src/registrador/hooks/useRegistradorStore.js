import { useDispatch, useSelector } from "react-redux";
import { iniciarRutaApi } from "../api/iniciarRutaApi";
import {
  finalizarRecoleccion,
  iniciarRecoleccion,
  nuevoViaje,
} from "../../store/recoleccion/recoleccionSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { viajesApi } from "../api/viajesApi";
import { finalizarRutaApi } from "../api/finalizarRutaApi";

export const useRegistradorStore = () => {
  const {
    id_recoleccion,
    id_registrador,
    id_ruta,
    id_vehiculo,
    id_viaje,
    km_inicial,
    numero_viaje,
  } = useSelector((state) => state.recoleccion);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onIniciarRecoleccion = async (recoleccion) => {
    try {
      const { data } = await iniciarRutaApi.post("/iniciarRuta/", recoleccion);
      dispatch(iniciarRecoleccion(data));
      localStorage.setItem("recoleccion", JSON.stringify(data));
      navigate("/ruta");
    } catch (error) {
      console.log(error);
    }
  };

  const recuperarRecoleccion = useCallback(
    async (id_usuario) => {
      const buscarRecoleccionUsuario = async () => {
        try {
          const { data } = await iniciarRutaApi.get(
            `/recoleccion_actual_usuario/${id_usuario}`
          );
          console.log(data);

          dispatch(iniciarRecoleccion(data));
          localStorage.setItem("recoleccion", JSON.stringify(data));
          navigate("/ruta");
        } catch (error) {
          console.log(error);
        }
      };

      const recoleccion = localStorage.getItem("recoleccion");
      if (!recoleccion) {
        buscarRecoleccionUsuario();
        navigate("/");
        return;
      }
      dispatch(iniciarRecoleccion(JSON.parse(recoleccion)));
    },
    [dispatch, navigate]
  );

  const onNuevoViaje = async () => {
    try {
      const { data } = await viajesApi.post(`/recoleccion/${id_recoleccion}`);
      const { id_viaje, numero_viaje } = data;
      dispatch(nuevoViaje({ id_viaje, numero_viaje }));
      const recoleccionActualizada = {
        ...JSON.parse(localStorage.getItem("recoleccion")),
        id_viaje,
        numero_viaje,
      };
      localStorage.setItem(
        "recoleccion",
        JSON.stringify(recoleccionActualizada)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onFinalizarRuta = async (finalizarRuta) => {
    try {
      await finalizarRutaApi.put(`/${id_recoleccion}`, {
        ...finalizarRuta,
        id_registrador,
        id_ruta,
        id_vehiculo,
      });
      dispatch(finalizarRecoleccion());
      localStorage.removeItem("recoleccion");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    id_recoleccion,
    id_registrador,
    id_ruta,
    id_vehiculo,
    id_viaje,
    km_inicial,
    numero_viaje,
    onIniciarRecoleccion,
    recuperarRecoleccion,
    onNuevoViaje,
    onFinalizarRuta,
  };
};
