import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  kmInicio: "",
  vehiculo: "",
  ruta: "",
};

const initialErrors = {
  kmInicio: false,
  vehiculo: false,
  ruta: false,
};

function IniciarRuta() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const navigate = useNavigate();

  const vehiculosBD = [
    {
      id: 1,
      placa: "ABC-1234",
      alias: "Vehículo 1",
    },
    {
      id: 2,
      placa: "DEF-4567",
      alias: "Vehículo 2",
    },
    {
      id: 3,
      placa: "GHI-7890",
      alias: "Vehículo 3",
    },
  ];

  const rutasDB = [
    {
      id: 1,
      nombre: "Ruta A",
    },
    {
      id: 2,
      nombre: "Ruta B",
    },
    {
      id: 3,
      nombre: "Ruta C",
    },
  ];

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: false });
    }
  };

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;
    if (!form.kmInicio) {
      newErrors.kmInicio = true;
      isValid = false;
    }
    if (!form.vehiculo) {
      newErrors.vehiculo = true;
      isValid = false;
    }
    if (!form.ruta) {
      newErrors.ruta = true;
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // TODO: ENVIAR DATOS A LA API Y REDIRECCIONAR A LA PÁGINA DE RUTA
      console.log(form);
      setForm(initialForm);
      navigate("/ruta");
    }
  };

  return (
    <div className="mx-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-10">
        Iniciar Ruta
      </h2>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="kmInicio"
            className="text-global-principal/80 font-semibold text-lg"
          >
            Kilometraje Inicio
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.kmInicio ? "ring-red-500 ring" : ""}`}
            type="number"
            id="kmInicio"
            name="kmInicio"
            placeholder="Kilometraje"
            value={form.kmInicio}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="vehiculo"
            className="text-global-principal/80 font-semibold text-lg"
          >
            Vehículo
          </label>
          <select
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3
            ${errors.vehiculo ? "ring ring-red-500" : ""}`}
            name="vehiculo"
            id="vehiculo"
            onChange={handleChange}
            value={form.vehiculo}
          >
            <option value="" disabled>
              Selecciona un vehículo
            </option>
            {vehiculosBD.map((vehiculo) => (
              <option key={vehiculo.id} value={vehiculo.id}>
                {vehiculo.placa} - {vehiculo.alias}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="ruta"
            className="text-global-principal/80 font-semibold text-lg"
          >
            Ruta
          </label>
          <select
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.ruta ? "ring ring-red-500" : ""}`}
            name="ruta"
            onChange={handleChange}
            value={form.ruta}
          >
            <option value="" disabled>
              Selecciona una ruta
            </option>
            {rutasDB.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <button
            className="bg-global-principal/90 text-white font-bold text-lg rounded-lg py-3 mt-10 active:bg-[#1A365D]"
            type="submit"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default IniciarRuta;
