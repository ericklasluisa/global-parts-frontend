import { useEffect, useState } from "react";
import { iniciarRutaApi } from "../api/iniciarRutaApi";
import { useRegistradorStore } from "../hooks/useRegistradorStore";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

const initialErrors = {
  km_inicial: false,
  id_vehiculo: false,
  id_ruta: false,
  id_registrador: false,
};

function IniciarRuta() {
  const { onIniciarRecoleccion } = useRegistradorStore();
  const { user } = useAuthStore();

  const initialForm = {
    km_inicial: "",
    id_vehiculo: "",
    id_ruta: "",
    id_registrador: user.id_usuario,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [vehiculosDB, setVehiculosDB] = useState([]);
  const [rutasDB, setRutasDB] = useState([]);

  useEffect(() => {
    iniciarRutaApi.get("vehiculos/id_placa/").then((response) => {
      setVehiculosDB(response.data);
    });

    iniciarRutaApi.get("rutas/id_nombre/").then((response) => {
      setRutasDB(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;
    if (!form.km_inicial) {
      newErrors.km_inicial = true;
      isValid = false;
    }
    if (!form.id_vehiculo) {
      newErrors.id_vehiculo = true;
      isValid = false;
    }
    if (!form.id_ruta) {
      newErrors.id_ruta = true;
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onIniciarRecoleccion(form);
      setForm(initialForm);
    }
  };

  return (
    <div className="m-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-10 sm:mb-5">
        Iniciar Ruta
      </h2>
      <form
        className="flex flex-col gap-5 sm:w-1/2 sm:mx-auto sm:gap-2.5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label
            htmlFor="km_inicial"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Kilometraje Inicio
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.km_inicial ? "ring-red-500 ring" : ""}`}
            type="number"
            id="km_inicial"
            name="km_inicial"
            placeholder="Kilometraje"
            value={form.km_inicial}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="id_vehiculo"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Vehículo
          </label>
          <select
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3
            ${errors.id_vehiculo ? "ring ring-red-500" : ""}`}
            name="id_vehiculo"
            id="id_vehiculo"
            onChange={handleChange}
            value={form.id_vehiculo}
          >
            <option value="" disabled>
              Selecciona un vehículo
            </option>
            {vehiculosDB.map((vehiculo) => (
              <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                {vehiculo.placa}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="id_ruta"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Ruta
          </label>
          <select
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.id_ruta ? "ring ring-red-500" : ""}`}
            name="id_ruta"
            onChange={handleChange}
            value={form.id_ruta}
          >
            <option value="" disabled>
              Selecciona una ruta
            </option>
            {rutasDB.map((ruta) => (
              <option key={ruta.id_ruta} value={ruta.id_ruta}>
                {ruta.nombre_ruta}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <button
            className="bg-global-principal/90 text-white font-bold text-lg rounded-lg py-3 mt-10 active:bg-[#1A365D] sm:mt-5"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default IniciarRuta;
