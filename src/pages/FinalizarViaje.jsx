/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialErrors = {
  numViaje: false,
  tonelajeEntrada: false,
  tonelajeSalida: false,
  fotoTonelaje: false,
};

function FinalizarViaje({ viajes }) {
  const initialForm = {
    numViaje: viajes.length || 1,
    tonelajeEntrada: "",
    tonelajeSalida: "",
    tonelajeViaje: "",
    fotoTonelaje: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const navigate = useNavigate();

  useEffect(() => {
    if (form.tonelajeEntrada && form.tonelajeSalida) {
      const tonelajeEntradaNum = parseFloat(form.tonelajeEntrada);
      const tonelajeSalidaNum = parseFloat(form.tonelajeSalida);
      if (!isNaN(tonelajeEntradaNum) && !isNaN(tonelajeSalidaNum)) {
        if (tonelajeEntradaNum < tonelajeSalidaNum) {
          setForm((prevForm) => ({
            ...prevForm,
            tonelajeViaje: tonelajeSalidaNum - tonelajeEntradaNum,
          }));
        } else {
          setForm((prevForm) => ({
            ...prevForm,
            tonelajeViaje: "",
          }));
        }
      }
    }
  }, [form.tonelajeEntrada, form.tonelajeSalida]);

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
    if (!form.tonelajeEntrada) {
      newErrors.tonelajeEntrada = true;
      isValid = false;
    }
    if (!form.tonelajeSalida) {
      newErrors.tonelajeSalida = true;
      isValid = false;
    }
    if (form.tonelajeEntrada && form.tonelajeEntrada < 0) {
      newErrors.tonelajeEntrada = true;
      isValid = false;
    }
    if (form.tonelajeSalida && form.tonelajeSalida < 0) {
      newErrors.tonelajeSalida = true;
      isValid = false;
    }
    if (!form.fotoTonelaje) {
      newErrors.fotoTonelaje = true;
      isValid = false;
    }
    if (form.tonelajeEntrada && form.tonelajeSalida) {
      if (parseFloat(form.tonelajeEntrada) > parseFloat(form.tonelajeSalida)) {
        newErrors.tonelajeSalida = true;
        newErrors.tonelajeEntrada = true;
        isValid = false;
      }
    }

    // TODO: VALIDAR NUMERO DE VIAJE
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // TODO: ENVIAR DATOS A LA API Y REDIRECCIONAR A LA PÁGINA DE RUTA
      console.log(form);
      navigate("/ruta");
      setForm(initialForm);
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm({
          ...form,
          fotoTonelaje: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-10 sm:mb-5">
        Viajes
      </h2>
      <form className="flex flex-col gap-5 sm:w-1/2 sm:mx-auto sm:gap-3">
        <div className="flex flex-col">
          <select
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 w-1/3
            ${errors.numViaje ? "ring ring-red-500" : ""}`}
            name="numViaje"
            id="numViaje"
            onChange={handleChange}
            value={form.numViaje}
          >
            {viajes.map((viaje) => (
              <option key={viaje.numViaje} value={viaje.numViaje}>
                Viaje {viaje.numViaje}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="tonelajeEntrada"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Tonelaje Entrada
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.tonelajeEntrada ? "ring-red-500 ring" : ""}`}
            type="number"
            name="tonelajeEntrada"
            placeholder="Tonelaje"
            value={form.tonelajeEntrada}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="tonelajeSalida"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Tonelaje Salida
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.tonelajeSalida ? "ring-red-500 ring" : ""}`}
            type="number"
            name="tonelajeSalida"
            placeholder="Tonelaje"
            value={form.tonelajeSalida}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="tonelajeViaje"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Tonelaje Viaje
          </label>
          <input
            className="bg-white border-[#D8D8D8] border rounded-lg p-2 mt-3"
            type="number"
            name="tonelajeViaje"
            placeholder="Tonelaje del viaje"
            value={form.tonelajeViaje}
            disabled
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="fotoTonelaje"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Foto Tonelaje
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.fotoTonelaje ? "ring-red-500 ring" : ""}`}
            type="file"
            name="fotoTonelaje"
            onChange={handleImage}
          />
        </div>

        <div className="flex flex-col">
          <button
            className="bg-global-principal/90 text-white font-bold text-lg rounded-lg py-3 mt-10 active:bg-[#1A365D] sm:mt-5"
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

export default FinalizarViaje;
