import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { viajesApi } from "../../api/viajesApi";
import { useRegistradorStore } from "../../hooks/useRegistradorStore";

function ModalFinalizarViaje({
  openModalFinalizarViaje,
  setOpenModalFinalizarViaje,
  form,
  setForm,
  initialForm,
}) {
  const finalizarViajeDialogRef = useRef(null);
  const navigate = useNavigate();
  const { id_recoleccion } = useRegistradorStore();

  useEffect(() => {
    if (openModalFinalizarViaje) {
      finalizarViajeDialogRef.current.showModal();
    } else {
      finalizarViajeDialogRef.current.close();
    }
  }, [openModalFinalizarViaje]);

  const handleNuevoViaje = () => {
    console.log(initialForm);
    viajesApi.post(`/recoleccion/${id_recoleccion}`);
    setForm(initialForm);
    setOpenModalFinalizarViaje(false);
    navigate("/ruta");
  };

  const handleFinRuta = () => {
    console.log(form);
    // TODO: Implementar interacción con backend para registrar viaje
    setForm(initialForm);
    setOpenModalFinalizarViaje(false);
    navigate("/finalizar-ruta");
  };

  return (
    <dialog ref={finalizarViajeDialogRef}>
      <div className="flex flex-col px-5 py-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setOpenModalFinalizarViaje(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-global-principal mx-auto my-3">
          Finalizar Viaje #{form.numViaje}
        </h2>
        <p className="text-base font-semibold text-center text-global-principal">
          ¿Desea iniciar un nuevo viaje o finalizar la ruta?
        </p>
        <div className="flex justify-between gap-3 my-5">
          <button
            className="bg-green-600 text-white font-bold text-lg rounded-lg px-3 py-3 mt-5 active:bg-[#1A365D] sm:mt-5"
            onClick={handleNuevoViaje}
          >
            Nuevo Viaje
          </button>
          <button
            className="bg-blue-700 text-white font-bold text-lg rounded-lg px-3 py-3 mt-5 active:bg-[#1A365D] sm:mt-5"
            onClick={handleFinRuta}
          >
            Finalizar Ruta
          </button>
        </div>
      </div>
    </dialog>
  );
}

ModalFinalizarViaje.propTypes = {
  openModalFinalizarViaje: PropTypes.bool.isRequired,
  setOpenModalFinalizarViaje: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  initialForm: PropTypes.object.isRequired,
};

export default ModalFinalizarViaje;
