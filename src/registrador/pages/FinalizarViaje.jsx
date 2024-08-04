/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import ModalFinalizarViaje from "../components/finalizarViaje/ModalFinalizarViaje";
import { useRegistradorStore } from "../hooks/useRegistradorStore";
import { viajesApi } from "../api/viajesApi";
import { useNavigate } from "react-router-dom";

const initialErrors = {
  numero_viaje: false,
  tonelaje_entrada: false,
  tonelaje_salida: false,
  foto_entrada: false,
  foto_salida: false,
};

function FinalizarViaje() {
  const { numero_viaje, id_recoleccion, id_viaje } = useRegistradorStore();

  const navigate = useNavigate();

  useEffect(() => {
    id_recoleccion || navigate("/");
  }, [navigate, id_recoleccion]);

  const initialForm = {
    numero_viaje,
    tonelaje_entrada: "",
    tonelaje_salida: "",
    tonelajeViaje: "",
    foto_entrada: null,
    foto_salida: null,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [imgTonelajeEntrada, setImgTonelajeEntrada] = useState(null);
  const [imgTonelajeSalida, setImgTonelajeSalida] = useState(null);
  const [openModalFinalizarViaje, setOpenModalFinalizarViaje] = useState(false);
  const [viajes, setViajes] = useState();

  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const { data } = await viajesApi.get(`/recoleccion/${id_recoleccion}`);
        setViajes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerViajes();
  }, [id_recoleccion]);

  useEffect(() => {
    if (form.tonelaje_entrada && form.tonelaje_salida) {
      const tonelajeEntradaNum = parseFloat(form.tonelaje_entrada);
      const tonelajeSalidaNum = parseFloat(form.tonelaje_salida);
      if (!isNaN(tonelajeEntradaNum) && !isNaN(tonelajeSalidaNum)) {
        if (tonelajeSalidaNum < tonelajeEntradaNum) {
          setForm((prevForm) => ({
            ...prevForm,
            tonelajeViaje: tonelajeEntradaNum - tonelajeSalidaNum,
          }));
        } else {
          setForm((prevForm) => ({
            ...prevForm,
            tonelajeViaje: "",
          }));
        }
      }
    }
  }, [form.tonelaje_entrada, form.tonelaje_salida]);

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
    if (!form.tonelaje_entrada) {
      newErrors.tonelaje_entrada = true;
      isValid = false;
    }
    if (!form.tonelaje_salida) {
      newErrors.tonelaje_salida = true;
      isValid = false;
    }
    if (form.tonelaje_entrada && form.tonelaje_entrada < 0) {
      newErrors.tonelaje_entrada = true;
      isValid = false;
    }
    if (form.tonelaje_salida && form.tonelaje_salida < 0) {
      newErrors.tonelaje_salida = true;
      isValid = false;
    }
    if (!form.foto_entrada) {
      newErrors.foto_entrada = true;
      isValid = false;
    }
    if (!form.foto_salida) {
      newErrors.foto_salida = true;
      isValid = false;
    }
    if (form.tonelaje_entrada && form.tonelaje_salida) {
      if (
        parseFloat(form.tonelaje_entrada) < parseFloat(form.tonelaje_salida)
      ) {
        newErrors.tonelaje_salida = true;
        newErrors.tonelaje_entrada = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      viajesApi.put(`/${id_viaje}`, {
        ...form,
        id_recoleccion,
      });
      setOpenModalFinalizarViaje(true);
      setForm(initialForm);
    }
  };

  const handleImgTonelajeEntradaButtonClick = () => {
    document.getElementById("foto_entrada").click();
  };

  const handleImgTonelajeEntradaChange = (event) => {
    const file = event.target.files[0];
    readImgTonelajeEntrada(file);
    if (errors["foto_entrada"]) {
      setErrors({ ...errors, ["foto_entrada"]: false });
    }
  };

  const readImgTonelajeEntrada = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgTonelajeEntrada(reader.result);
        setForm((prevState) => ({
          ...prevState,
          foto_entrada: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgTonelajeSalidaButtonClick = () => {
    document.getElementById("foto_salida").click();
  };

  const handleImgTonelajeSalidaChange = (event) => {
    const file = event.target.files[0];
    readImgTonelajeSalida(file);
    if (errors["foto_salida"]) {
      setErrors({ ...errors, ["foto_salida"]: false });
    }
  };

  const readImgTonelajeSalida = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgTonelajeSalida(reader.result);
        setForm((prevState) => ({
          ...prevState,
          foto_salida: reader.result,
        }));
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
            ${errors.numero_viaje ? "ring ring-red-500" : ""}`}
            name="numero_viaje"
            id="numero_viaje"
            onChange={handleChange}
            value={form.numero_viaje}
          >
            {viajes &&
              viajes.map((viaje) => (
                <option key={viaje.numero_viaje} value={viaje.numero_viaje}>
                  Viaje {viaje.numero_viaje}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="tonelaje_entrada"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Tonelaje Entrada
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.tonelaje_entrada ? "ring-red-500 ring" : ""}`}
            type="number"
            name="tonelaje_entrada"
            placeholder="Tonelaje"
            value={form.tonelaje_entrada}
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
            id="foto_entrada"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={handleImgTonelajeEntradaChange}
          />
        </div>

        <div className="mb-2">
          {errors.foto_entrada && (
            <p className="text-red-500 text-sm">Seleccione una imagen válida</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="tonelaje_salida"
            className="text-global-principal/80 font-semibold text-lg sm:text-base"
          >
            Tonelaje Salida
          </label>
          <input
            className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 
            ${errors.tonelaje_salida ? "ring-red-500 ring" : ""}`}
            type="number"
            name="tonelaje_salida"
            placeholder="Tonelaje"
            value={form.tonelaje_salida}
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
            id="foto_salida"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={handleImgTonelajeSalidaChange}
          />
        </div>

        <div className="mb-2">
          {errors.foto_salida && (
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
