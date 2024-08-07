import { dashboardAPI } from "../../api/dashboardApi";
import { MdFileDownload } from "react-icons/md";
import { useState } from "react";

export const DownloadAdminLoader = () => {
    return (
        <div className="w-4 h-4 border-[6px] border-[#dddddd] border-t-[#46C380] border-solid rounded-full animate-spin"></div>
    )
}

export const BotonExportarAdmin = ({ mes, anio }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await dashboardAPI.get(`/exportar_admin/${mes}/${anio}`, {
                responseType: 'blob', // importante para recibir un archivo binario
            });

            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Configurar el nombre del archivo
            const filename = `Reporte_${mes}_${anio}.xlsx`;
            link.setAttribute('download', filename);

            // Agregar el enlace al DOM y hacer clic en él para iniciar la descarga
            document.body.appendChild(link);
            link.click();

            // Remover el enlace del DOM
            link.parentNode.removeChild(link);
            setLoading(false);
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
        }
    };

    return (
        <button
            className="shadow-sm bg-global-principal text-white
            px-4 mb-4 mt-0 ml-auto
            rounded-full border-gray-200 border
            hover:bg-[#464769]"
            onClick={handleDownload}>
            {loading ? <DownloadAdminLoader /> : <MdFileDownload />}
        </button>
    );
};
