import { useEffect, useRef, useState } from "react";
import { FaFileImage, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const novedadesBD = [
  {
    id: 1,
    nombre: "Siniestro",
  },
  {
    id: 2,
    nombre: "Daño Manigucto",
  },
  {
    id: 3,
    nombre: "Pedal",
  },
  {
    id: 4,
    nombre: "Compuerta",
  },
  {
    id: 5,
    nombre: "Caucho",
  },
  {
    id: 6,
    nombre: "Rodillo de toma",
  },
  {
    id: 7,
    nombre: "Stickers/graffiti",
  },
  {
    id: 8,
    nombre: "Media Luna",
  },
  {
    id: 9,
    nombre: "Amortiguador",
  },
];

const initialFormState = {
  id: 0,
  nombre: "",
  file: null,
};

const initialErrors = {
  id: false,
  file: false,
};

function ModalNovedad({
  onNovedadSubmit,
  novedadActual,
  openModalNovedad,
  setOpenModalNovedad,
  codigoContenedor,
}) {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [preview, setPreview] = useState(null);
  const novedadDialogRef = useRef(null);

  useEffect(() => {
    if (openModalNovedad) {
      novedadDialogRef.current.showModal();
      if (novedadActual) {
        const id = novedadActual.id;
        const nombre = novedadActual.nombre;
        const file = novedadActual.file;
        setFormState((prevState) => ({
          ...prevState,
          id: id,
          nombre: nombre,
          file: file,
        }));
        readFile(file);
      }
    } else {
      novedadDialogRef.current.close();
    }
  }, [openModalNovedad, novedadActual]);

  const handleChange = (novedad) => {
    const { id, nombre } = novedad;
    setFormState((prevState) => ({
      ...prevState,
      id: id,
      nombre: nombre,
    }));
    if (errors["id"]) {
      setErrors({ ...errors, ["id"]: false });
    }
  };

  const readFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFormState((prevState) => ({
        ...prevState,
        file: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    readFile(file);
    if (errors["file"]) {
      setErrors({ ...errors, ["file"]: false });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...initialErrors };
    if (!formState.id) {
      newErrors.id = true;
      valid = false;
    }
    if (!formState.file) {
      newErrors.file = true;
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const resetModal = () => {
    setOpenModalNovedad(false);
    setFormState(initialFormState);
    setPreview(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNovedadSubmit(formState);
      resetModal();
    }
  };

  const handleFileButtonClick = () => {
    document.getElementById("file").click();
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
                key={novedad.id}
                className="flex items-center gap-3 my-2 text-lg"
              >
                <input
                  type="radio"
                  id={`novedad${novedad.id}`}
                  name="novedad"
                  value={novedad.id}
                  checked={formState.id === novedad.id}
                  onChange={() => handleChange(novedad)}
                />
                <label htmlFor={`novedad${novedad.id}`}>{novedad.nombre}</label>
              </div>
            ))}
            {errors.id && (
              <p className="text-red-500 text-sm">Seleccione una novedad</p>
            )}
          </fieldset>

          <div className="flex items-center gap-4 mt-5 p-4 bg-gray-200 rounded-lg">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-md">
              {preview ? (
                <img
                  src={preview}
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
              onClick={handleFileButtonClick}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              Buscar
            </button>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-5">
            {errors.file && (
              <p className="text-red-500 text-sm">
                Seleccione una imagen válida
              </p>
            )}
          </div>

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
  novedadActual: PropTypes.object.isRequired,
  openModalNovedad: PropTypes.bool.isRequired,
  setOpenModalNovedad: PropTypes.func.isRequired,
  codigoContenedor: PropTypes.string.isRequired,
};

export default ModalNovedad;
