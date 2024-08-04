import EjemploTablaMUI from "../components/tablaRegistrador/EjemploTablaMUI";
import { useRegistradorStore } from "../hooks/useRegistradorStore";

function RegistroRuta() {
  const recoleccion = useRegistradorStore();

  return (
    <div className="m-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-10 sm:mb-5">
        Registro de Ruta
      </h2>
      <div className="flex justify-between mx-2 text-global-principal">
        <h3 className="text-2xl font-bold">Ruta {recoleccion.id_recoleccion}</h3>
        <h3 className="text-2xl font-bold">
          Viaje #{recoleccion.numero_viaje}
        </h3>
      </div>
      <div className="flex my-5 gap-2">
        <div className="flex flex-col bg-global-principal rounded-xl text-white px-2 py-3 flex-1">
          <p className="font-extrabold text-sm">Todos</p>
          <p className="text-xs">
            <span className="font-bold">1051</span> en Total
          </p>
        </div>
        <div className="flex flex-col border-gray-500 border-2 rounded-xl px-2 py-3 flex-1 text-global-principal/50">
          <p className="text-sm">Pendientes</p>
          <p className="text-xs">
            <span className="font-bold">188</span> en Total
          </p>
        </div>
        <div className="flex flex-col border-gray-500 border-2 rounded-xl px-2 py-3 flex-1 text-global-principal/50">
          <p className="text-sm">Recolectados</p>
          <p className="text-xs">
            <span className="font-bold">863</span> en Total
          </p>
        </div>
      </div>
      <EjemploTablaMUI />
    </div>
  );
}

export default RegistroRuta;
