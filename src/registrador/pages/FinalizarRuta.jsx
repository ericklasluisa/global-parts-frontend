import { useEffect, useState } from "react";
import { finalizarRutaApi } from "../api/finalizarRutaApi";
import { useRegistradorStore } from "../hooks/useRegistradorStore";
import { useNavigate } from "react-router-dom";

const initialForm = {
  km_final: "",
  tonelaje_total: "",
};

function FinalizarRuta() {
  const [form, setForm] = useState(initialForm);
  const [errorKmFinal, setErrorKmFinal] = useState(false);
  const { id_recoleccion, onFinalizarRuta } = useRegistradorStore();

  const navigate = useNavigate();

  useEffect(() => {
    id_recoleccion || navigate("/");
  }, [navigate, id_recoleccion]);

  useEffect(() => {
    const obtenerTonelajeTotal = async () => {
      try {
        const { data } = await finalizarRutaApi.get(
          `/${id_recoleccion}/tonelaje`
        );

        data &&
          setForm((prevForm) => ({
            ...prevForm,
            tonelaje_total: data,
          }));
      } catch (error) {
        console.log(error);
      }
    };

    obtenerTonelajeTotal();
  }, [id_recoleccion]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    errorKmFinal && setErrorKmFinal(false);
  };

  const validateForm = () => {
    let newError = false;
    let isValid = true;
    if (!form.km_final) {
      newError = true;
      isValid = false;
    }
    setErrorKmFinal(newError);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onFinalizarRuta(form);
      setForm(initialForm);
    }
  };

  return (
    <div className="m-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-10 sm:mb-5">
        Finalizar Ruta
      </h2>
      <form className="flex flex-col gap-5 sm:w-1/2 sm:mx-auto sm:gap-3">
        <div className="flex flex-col">
          <label
            htmlFor="kmInicio"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Kilometraje Final
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errorKmFinal ? "ring-red-500 ring" : ""}`}
            type="number"
            name="km_final"
            placeholder="Kilometraje"
            value={form.km_final}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="kmInicio"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Tonelaje Final
          </label>
          <input
            className="bg-white border-[#D8D8D8] border rounded-lg p-2 mt-3"
            type="number"
            name="tonelaje_total"
            placeholder="Σ Tonelaje Total"
            value={form.tonelaje_total}
            onChange={handleChange}
            disabled
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

export default FinalizarRuta;
