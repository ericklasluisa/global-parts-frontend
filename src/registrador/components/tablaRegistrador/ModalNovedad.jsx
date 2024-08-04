import { useEffect, useRef, useState } from "react";
import { FaFileImage, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const novedadesBD = [
  { id_novedad: 1, nombre: "Siniestro" },
  { id_novedad: 2, nombre: "Daño Manigucto" },
  { id_novedad: 3, nombre: "Pedal" },
  { id_novedad: 4, nombre: "Compuerta" },
  { id_novedad: 5, nombre: "Caucho" },
  { id_novedad: 6, nombre: "Rodillo de toma" },
  { id_novedad: 7, nombre: "Stickers/graffiti" },
  { id_novedad: 8, nombre: "Media Luna" },
  { id_novedad: 9, nombre: "Amortiguador" },
];

const initialFormState = [];

const initialErrors = {
  novedades: false,
};

function ModalNovedad({
  onNovedadSubmit,
  novedadActual,
  openModalNovedad,
  setOpenModalNovedad,
  codigoContenedor,
}) {
  //TODO: IMAGEN NO SE RENDERIZA EN EL MODAL CUANDO SE RECARGA LA PÁGINA
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [preview, setPreview] = useState({});
  const novedadDialogRef = useRef(null);

  useEffect(() => {
    if (openModalNovedad) {
      novedadDialogRef.current.showModal();
      if (novedadActual) {
        setFormState(novedadActual);
        const previews = {};
        novedadActual.forEach((novedad) => {
          if (novedad.foto_novedad) {
            previews[novedad.id_novedad] = novedad.foto_novedad;
            setPreview(previews);
          }
        });
      }
    } else {
      novedadDialogRef.current.close();
    }
  }, [openModalNovedad, novedadActual]);

  const handleChange = (id_novedad) => {
    if (formState.some((n) => n.id_novedad === id_novedad)) {
      setFormState(formState.filter((n) => n.id_novedad !== id_novedad));
    } else {
      setFormState([
        ...formState,
        { id_novedad: id_novedad, foto_novedad: null },
      ]);
    }

    if (errors.novedades) {
      setErrors({ ...errors, novedades: false });
    }
  };

  const handleFileChange = (id_novedad, foto_novedad) => {
    if (foto_novedad && foto_novedad.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({ ...prev, [id_novedad]: reader.result }));
        const updatedFormState = formState.map((n) =>
          n.id_novedad === id_novedad
            ? { ...n, foto_novedad: reader.result }
            : n
        );
        setFormState(updatedFormState);
      };
      reader.readAsDataURL(foto_novedad);
    }

    if (errors.novedades) {
      setErrors({ ...errors, novedades: false });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...initialErrors };
    if (formState.length === 0 || formState.some((n) => !n.foto_novedad)) {
      newErrors.novedades = true;
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const resetModal = () => {
    setOpenModalNovedad(false);
    setFormState(initialFormState);
    setPreview({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNovedadSubmit(formState);
      resetModal();
    }
  };

  const handleFileButtonClick = (id_novedad) => {
    document.getElementById(`file${id_novedad}`).click();
  };

  return (
    <dialog
      ref={novedadDialogRef}
      className="rounded-lg shadow-lg w-11/12 md:w-1/2 p-5"
    >
      <div className="flex flex-col px-5 py-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => resetModal()}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center mt-3">
          <h2 className="text-2xl font-bold text-global-principal">
            Contenedor #{codigoContenedor}
          </h2>
          <h2 className="text-xl text-global-principal font-bold">Novedad:</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset className="text-global-principal">
            {novedadesBD.map((novedad) => (
              <div
                key={novedad.id_novedad}
                className="flex items-center gap-3 my-2 text-lg"
              >
                <input
                  type="checkbox"
                  id={`novedad${novedad.id_novedad}`}
                  name="novedad"
                  value={novedad.id_novedad}
                  checked={formState.some(
                    (n) => n.id_novedad === novedad.id_novedad
                  )}
                  onChange={() => handleChange(novedad.id_novedad)}
                />
                <label htmlFor={`novedad${novedad.id_novedad}`}>
                  {novedad.nombre}
                </label>
              </div>
            ))}
            {errors.novedades && (
              <p className="text-red-500 text-sm">
                Seleccione al menos una novedad y suba sus imágenes
              </p>
            )}
          </fieldset>

          {formState.map((novedad) => (
            <div key={novedad.id_novedad} className="my-5">
              <p className="font-bold">
                Suba la imagen de la novedad:{" "}
                <span className="font-medium">
                  {" "}
                  {
                    novedadesBD.find((n) => n.id_novedad === novedad.id_novedad)
                      .nombre
                  }
                </span>
                <span className="font-normal">{novedad.nombre}</span>
              </p>
              <div className="flex items-center gap-4 mt-2 p-4 bg-gray-200 rounded-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-md">
                  {preview[novedad.id_novedad] ? (
                    <img
                      src={preview[novedad.id_novedad]}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <FaFileImage className="text-gray-500 text-2xl" />
                  )}
                </div>
                <div className="flex-1 text-gray-500">Suba una imagen</div>
                <button
                  type="button"
                  onClick={() => handleFileButtonClick(novedad.id_novedad)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md"
                >
                  Buscar
                </button>
                <input
                  type="file"
                  id={`file${novedad.id_novedad}`}
                  name={`file${novedad.id_novedad}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(novedad.id_novedad, e.target.files[0])
                  }
                />
              </div>
            </div>
          ))}

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

ModalNovedad.propTypes = {
  onNovedadSubmit: PropTypes.func.isRequired,
  novedadActual: PropTypes.array.isRequired,
  openModalNovedad: PropTypes.bool.isRequired,
  setOpenModalNovedad: PropTypes.func.isRequired,
  codigoContenedor: PropTypes.number.isRequired,
};

export default ModalNovedad;
