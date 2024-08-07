// ModalImagenes.js
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FaTimes } from "react-icons/fa";
import image1 from "../img/contenedor1.jpg";
import image2 from "../img/contenedor2.jpg";
import image3 from "../img/contenedor3.jpg";

const novedadContenedor = {
    contenedor: 1,
    novedades: [1, 2, 3],
    estado: 'pendiente',
    solventado: false
};

const novedades = [
    { id: 1, novedad: "Grafiteado" },
    { id: 2, novedad: "Pedal Roto" },
    { id: 3, novedad: "Faltante" }
];

const images = [
    { src: image1, novedadId: 1 },
    { src: image2, novedadId: 2 },
    { src: image3, novedadId: 3 }
];

const ModalImagenes = forwardRef(({ onClose }, ref) => {
    const [currentImage, setCurrentImage] = useState(0);
    const dialogRef = useRef(null);

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current.showModal(),
        close: () => dialogRef.current.close(),
    }));

    const handleNextImage = () => {
        setCurrentImage((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImage((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleDownload = async () => {
        const zip = new JSZip();
        const folder = zip.folder(`Contenedor_${novedadContenedor.contenedor.toString().padStart(2, "0")}`);

        for (const { src, novedadId } of images) {
            const response = await fetch(src);
            const blob = await response.blob();
            const novedadName = novedades.find(n => n.id === novedadId).novedad;
            folder.file(`${novedadName}.jpg`, blob);
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, `Contenedor_${novedadContenedor.contenedor.toString().padStart(2, "0")}.zip`);
        });
    };

    return (
        <dialog
            ref={dialogRef}
            className="rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-5"
        >

            <div className="flex justify-end">
                <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => {
                        onClose();
                        dialogRef.current.close();
                    }}
                >
                    <FaTimes size={20} />
                </button>
            </div>
            <div className="flex flex-col px-5 py-8">
                <h1 className="font-bold text-2xl text-center mb-5">Contenedor {novedadContenedor.contenedor.toString().padStart(2, "0")}</h1>
                <h2 className="text-global-principal/80 font-semibold text-lg">
                    Novedades:
                </h2>
                <div className="flex flex-col gap-x-3">
                    {novedadContenedor.novedades.map((novedad) => (
                        <input
                            key={novedad}
                            className="bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 flex-1"
                            type="text"
                            name="novedad"
                            placeholder={novedades.find((n) => n.id === novedad).novedad}
                            disabled
                        />
                    ))}
                </div>
                <div className="flex flex-col items-center py-4">
                    <img
                        src={images[currentImage].src}
                        alt="Imagen de novedad"
                        className="w-50 h-50 mb-4"
                    />
                    <div className="flex items-center space-x-5">
                        <button
                            className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
                            onClick={handlePrevImage}
                        >
                            {/* Icono de flecha hacia la izquierda */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>



                        </button>
                        <button
                            className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
                            onClick={handleNextImage}
                        >
                            {/* Icono de flecha hacia la derecha */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>

                        </button>

                    </div>
                    <button
                        className="bg-global-principal/90 text-white text-lg rounded-lg py-2 px-2 hover:bg-[#1A365D] active:bg-[#1A365D] mt-10"
                        type="button"
                        onClick={handleDownload}
                    >
                        Descargar todo
                    </button>
                </div>
            </div>
        </dialog >
    );
});



export default ModalImagenes;
