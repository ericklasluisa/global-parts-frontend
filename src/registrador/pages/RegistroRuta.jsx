import { useEffect } from "react";
import EjemploTablaMUI from "../components/tablaRegistrador/EjemploTablaMUI";
import { useRegistradorStore } from "../hooks/useRegistradorStore";
import { useNavigate } from "react-router-dom";

function RegistroRuta() {
  const recoleccion = useRegistradorStore();
  const navigate = useNavigate();

  useEffect(() => {
    recoleccion.id_recoleccion || navigate("/");
  }, [navigate, recoleccion.id_recoleccion]);

  return (
    <div className="m-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-10 sm:mb-5">
        Registro de Ruta
      </h2>
      <div className="flex justify-between mx-2 text-global-principal">
        <h3 className="text-2xl font-bold">
          Ruta {recoleccion.id_recoleccion}
        </h3>
        <h3 className="text-2xl font-bold">
          Viaje #{recoleccion.numero_viaje}
        </h3>
      </div>

      <EjemploTablaMUI />
    </div>
  );
}

export default RegistroRuta;
