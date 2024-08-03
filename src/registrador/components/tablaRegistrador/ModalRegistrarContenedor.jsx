import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import ModalNovedad from "./ModalNovedad";
import { registrosApi } from "../../api/registrosApi";
import { useRegistradorStore } from "../../hooks/useRegistradorStore";

const initialFormState = {
  hora_registro: "",
  porcentaje: "",
  novedades: [],
};

const initialErrors = {
  porcentaje: false,
};

function ModalRegistrarContenedor({
  codigo,
  principal,
  transversal,
  sector,
  hora,
  porcentaje,
  novedad,
  openModalRegistrar,
  setOpenModalRegistrar,
  onUpdate,
  rowIndex,
}) {
  const dialogRef = useRef(null);
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [openModalNovedad, setOpenModalNovedad] = useState(false);

  const { id_viaje } = useRegistradorStore();

  useEffect(() => {
    if (openModalRegistrar) {
      const currentHour =
        hora ||
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
      setFormState({
        hora_registro: currentHour,
        porcentaje,
        novedades: novedad,
      });
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [openModalRegistrar, hora, porcentaje, novedad]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...initialErrors };
    if (!formState.porcentaje) {
      newErrors.porcentaje = true;
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      registrosApi.post("/upsertRegistro/", {
        id_viaje: id_viaje,
        contenedor_id: codigo,
        fecha_registro: new Date().toISOString().split("T")[0],
        hora_registro: new Date().toISOString().split("T")[1].slice(0, 8),
        porcentaje: formState.porcentaje,
        novedades: formState.novedades,
      });

      onUpdate(rowIndex, formState);
      setOpenModalRegistrar(false);
      setFormState(initialFormState);
    }
  };

  const handleNovedadSubmit = (novedadModal) => {
    const novedades = novedadModal;
    setFormState((prevState) => ({
      ...prevState,
      novedades,
    }));
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="rounded-lg shadow-lg w-11/12 md:w-1/2 p-5"
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setOpenModalRegistrar(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex flex-col px-5 py-8">
          <h2 className="text-2xl font-bold text-global-principal mx-auto mb-5">
            Contenedor #{codigo}
          </h2>
          <p className="text-base text-global-principal/75 font-semibold text-center px-3">
            {principal} y {transversal}
          </p>
          <p className="text-base text-global-principal/75 font-semibold text-center px-3">
            {sector}
          </p>
          <h3 className="text-xl text-global-principal font-bold">Registro:</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 items-center my-5">
              <label
                htmlFor="hora"
                className="font-semibold text-global-principal"
              >
                Hora:
              </label>
              <input
                className="border border-global-principal/50 rounded-md px-2 py-1 text-global-principal/75"
                type="time"
                id="hora"
                name="hora"
                value={formState.hora_registro}
                onChange={handleChange}
                readOnly
                disabled
              />
            </div>
            <fieldset className="text-global-principal">
              <legend className="font-semibold text-global-principal">
                Porcentaje:
              </legend>
              {["0", "20", "40", "60", "80", "100", "120"].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3 my-2 text-lg"
                >
                  <input
                    type="radio"
                    id={`porcentaje${value}`}
                    name="porcentaje"
                    value={value}
                    checked={formState.porcentaje == value}
                    onChange={handleChange}
                  />
                  <label htmlFor={`porcentaje${value}`}>{value}%</label>
                </div>
              ))}
              {errors.porcentaje && (
                <p className="text-red-500 text-sm">
                  Por favor, seleccione un porcentaje
                </p>
              )}
            </fieldset>
            <div className="flex justify-between gap-8">
              <button
                type="button"
                onClick={() => setOpenModalNovedad(true)}
                className={`text-white font-bold text-lg rounded-lg py-3 px-3 mt-10 active:bg-[#1A365D] sm:mt-5 ${
                  formState.novedades.length > 0
                    ? "bg-green-600"
                    : "bg-orange-600"
                }`}
              >
                {formState.novedades.length > 0
                  ? "Novedad Registrada"
                  : "Novedad"}
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold text-lg rounded-lg py-3 px-3 mt-10 active:bg-[#1A365D] sm:mt-5"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </dialog>
      {openModalNovedad && (
        <ModalNovedad
          onNovedadSubmit={handleNovedadSubmit}
          novedadActual={formState.novedades}
          openModalNovedad={openModalNovedad}
          setOpenModalNovedad={setOpenModalNovedad}
          codigoContenedor={codigo}
        />
      )}
    </>
  );
}

ModalRegistrarContenedor.propTypes = {
  codigo: PropTypes.number.isRequired,
  principal: PropTypes.string.isRequired,
  transversal: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  hora: PropTypes.string.isRequired,
  porcentaje: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  novedad: PropTypes.array.isRequired,
  openModalRegistrar: PropTypes.bool.isRequired,
  setOpenModalRegistrar: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default ModalRegistrarContenedor;
