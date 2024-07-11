import { useState } from "react";

const initialForm = {
  kmFinal: "",
  tonelajeTotal: "",
};

function FinalizarRuta() {
  const [form, setForm] = useState(initialForm);
  const [errorKmFinal, setErrorKmFinal] = useState(false);

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
    if (!form.kmFinal) {
      newError = true;
      isValid = false;
    }
    setErrorKmFinal(newError);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // TODO: ENVIAR DATOS A LA API Y REDIRECCIONAR A LA PÁGINA DE RUTA
      console.log(form);
      setForm(initialForm);
    }
  };

  return (
    <div className="mx-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-10">
        Finalizar Ruta
      </h2>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="kmInicio"
            className="text-global-principal/80 font-semibold text-lg"
          >
            Kilometraje Final
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errorKmFinal ? "ring-red-500 ring" : ""}`}
            type="number"
            name="kmFinal"
            placeholder="Kilometraje"
            value={form.kmFinal}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="kmInicio"
            className="text-global-principal/80 font-semibold text-lg"
          >
            Tonelaje Final
          </label>
          <input
            className="bg-white border-[#D8D8D8] border rounded-lg p-2 mt-3"
            type="number"
            name="tonelajeTotal"
            placeholder="Σ Tonelaje Total"
            value={form.tonelajeTotal}
            onChange={handleChange}
            disabled
          />
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

export default FinalizarRuta;
