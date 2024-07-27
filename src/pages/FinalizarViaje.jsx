/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import ModalFinalizarViaje from "../components/finalizarViaje/ModalFinalizarViaje";

const initialErrors = {
  numViaje: false,
  tonelajeEntrada: false,
  tonelajeSalida: false,
  imgTonelajeEntrada: false,
  imgTonelajeSalida: false,
};

function FinalizarViaje({ viajes }) {
  const initialForm = {
    numViaje: viajes.length || 1,
    tonelajeEntrada: "",
    tonelajeSalida: "",
    tonelajeViaje: "",
    imgTonelajeEntrada: null,
    imgTonelajeSalida: null,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [imgTonelajeEntrada, setImgTonelajeEntrada] = useState(null);
  const [imgTonelajeSalida, setImgTonelajeSalida] = useState(null);
  const [openModalFinalizarViaje, setOpenModalFinalizarViaje] = useState(false);

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
    if (!form.imgTonelajeEntrada) {
      newErrors.imgTonelajeEntrada = true;
      isValid = false;
    }
    if (!form.imgTonelajeSalida) {
      newErrors.imgTonelajeSalida = true;
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
      setOpenModalFinalizarViaje(true);
      // setForm(initialForm);
    }
  };

  const handleImgTonelajeEntradaButtonClick = () => {
    document.getElementById("imgTonelajeEntrada").click();
  };

  const handleImgTonelajeEntradaChange = (event) => {
    const file = event.target.files[0];
    readImgTonelajeEntrada(file);
    if (errors["imgTonelajeEntrada"]) {
      setErrors({ ...errors, ["imgTonelajeEntrada"]: false });
    }
  };

  const readImgTonelajeEntrada = (file) => {
    if (file && file.type.startsWith("image/")) {
      setForm((prevState) => ({
        ...prevState,
        imgTonelajeEntrada: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgTonelajeEntrada(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgTonelajeSalidaButtonClick = () => {
    document.getElementById("imgTonelajeSalida").click();
  };

  const handleImgTonelajeSalidaChange = (event) => {
    const file = event.target.files[0];
    readImgTonelajeSalida(file);
    if (errors["imgTonelajeSalida"]) {
      setErrors({ ...errors, ["imgTonelajeSalida"]: false });
    }
  };

  const readImgTonelajeSalida = (file) => {
    if (file && file.type.startsWith("image/")) {
      setForm((prevState) => ({
        ...prevState,
        imgTonelajeSalida: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgTonelajeSalida(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m-7">
      <h2 className="text-center text-global-principal text-3xl font-bold mb-3 sm:mb-5">
        Viajes
      </h2>
      <form className="flex flex-col gap-3 sm:w-1/2 sm:mx-auto sm:gap-3">
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

        <div className="flex items-center gap-4 p-4 bg-gray-200 rounded-lg">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-md">
            {imgTonelajeEntrada ? (
              <img
                src={imgTonelajeEntrada}
                alt="imgTonelajeEntrada"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <FaFileImage className="text-gray-500 text-2xl" />
            )}
          </div>
          <div className="flex-1 text-gray-500">Suba una imagen</div>
          <button
            type="button"
            onClick={handleImgTonelajeEntradaButtonClick}
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Buscar
          </button>
          <input
            type="file"
            id="imgTonelajeEntrada"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={handleImgTonelajeEntradaChange}
          />
        </div>

        <div className="mb-2">
          {errors.imgTonelajeEntrada && (
            <p className="text-red-500 text-sm">Seleccione una imagen válida</p>
          )}
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

        <div className="flex items-center gap-4 p-4 bg-gray-200 rounded-lg">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-md">
            {imgTonelajeSalida ? (
              <img
                src={imgTonelajeSalida}
                alt="imgTonelajeEntrada"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <FaFileImage className="text-gray-500 text-2xl" />
            )}
          </div>
          <div className="flex-1 text-gray-500">Suba una imagen</div>
          <button
            type="button"
            onClick={handleImgTonelajeSalidaButtonClick}
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Buscar
          </button>
          <input
            type="file"
            id="imgTonelajeSalida"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={handleImgTonelajeSalidaChange}
          />
        </div>

        <div className="mb-2">
          {errors.imgTonelajeSalida && (
            <p className="text-red-500 text-sm">Seleccione una imagen válida</p>
          )}
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
          <button
            className="bg-global-principal/90 text-white font-bold text-lg rounded-lg py-3 mt-5 active:bg-[#1A365D] sm:mt-5"
            type="submit"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </form>
      {openModalFinalizarViaje && (
        <ModalFinalizarViaje
          openModalFinalizarViaje={openModalFinalizarViaje}
          setOpenModalFinalizarViaje={setOpenModalFinalizarViaje}
          form={form}
          setForm={setForm}
          initialForm={initialForm}
        />
      )}
    </div>
  );
}

export default FinalizarViaje;
