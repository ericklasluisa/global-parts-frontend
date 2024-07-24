import { GoAlertFill } from "react-icons/go";
import { FaFilter, FaSearch } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { useState } from "react";

const notificaciones = [
    { contenedor: 1, mensaje: "El contenedor 1 ha sido recolectado", estado: "urgente", ruta: "A" },
    { contenedor: 2, mensaje: "El contenedor 2 ha sido recolectado", estado: "pendiente", ruta: "B" },
    { contenedor: 3, mensaje: "El contenedor 3", estado: "solventado", ruta: "C" },
    { contenedor: 4, mensaje: "El contenedor 4 ha sido recolectado", estado: "pendiente", ruta: "A" },
    { contenedor: 5, mensaje: "El contenedor 5 ha sido recolectado", estado: "pendiente", ruta: "B" },
    { contenedor: 6, mensaje: "El contenedor 6 ha sido recolectado", estado: "urgente", ruta: "C" },
    { contenedor: 7, mensaje: "El contenedor 7 ha sido recolectado", estado: "solventado", ruta: "A" },
    { contenedor: 8, mensaje: "El contenedor 8 ha sido recolectado", estado: "solventado", ruta: "B" },
    { contenedor: 9, mensaje: "El contenedor 9 ha sido recolectado", estado: "solventado", ruta: "C" },
    { contenedor: 10, mensaje: "El contenedor 10 ha sido recolectado", estado: "solventado", ruta: "A" },
    { contenedor: 11, mensaje: "El contenedor 11 ha sido recolectado", estado: "solventado", ruta: "B" },
    { contenedor: 12, mensaje: "El contenedor 12 ha sido recolectado", estado: "solventado", ruta: "C" },
    { contenedor: 13, mensaje: "El contenedor 13 ha sido recolectado", estado: "solventado", ruta: "A" },
    { contenedor: 14, mensaje: "El contenedor 14 ha sido recolectado", estado: "solventado", ruta: "B" },
    { contenedor: 15, mensaje: "El contenedor 15 ha sido recolectado", estado: "solventado", ruta: "C" },
    { contenedor: 16, mensaje: "El contenedor 16 ha sido recolectado", estado: "solventado", ruta: "A" },
    { contenedor: 17, mensaje: "El contenedor 17 ha sido recolectado", estado: "solventado", ruta: "B" },
];

function Notificacion({ contenedor, mensaje, estado }) {
    return (
        <div className="p-4 my-4 flex border-2 rounded-xl border-gray-500">
            <section>
                <h1 className="font-bold">Contenedor {contenedor.toString().padStart(2, "0")}</h1>
                <p className="text-gray-500 text-xs mt-3">{mensaje}</p>
            </section>
            <section className={`my-auto ml-auto w-1/3 flex flex-col ${estado === "urgente" ? 'text-red-600' : estado === "pendiente" ? 'text-yellow-300' : 'text-green-500'}`}>
                {
                    estado === "solventado"
                        ? <GrStatusGood className="text-5xl max-lg:text-3xl mx-auto" />
                        : <GoAlertFill className="text-5xl max-lg:text-3xl mx-auto" />
                }
                <p className="uppercase mx-auto max-lg:text-sm">{estado}</p>
            </section>
        </div>
    );
}

function Filtro({ setEstado, setRuta, setContenedor, setPaginaActual }) {
    const filtrarRuta = (e) => {
        setRuta(e.target.value);
        setPaginaActual(1);
    }
    const filtrarEstado = (e) => {
        setEstado(e.target.value);
        setPaginaActual(1);
    }

    const filtrarContenedor = (e) => {
        setContenedor(Number(e.target.value));
        setPaginaActual(1);
    }

    return (
        <div className="flex flex-col flex-1 md:pr-4">
            <div className="flex shadow-sm mx-auto bg-global-principal m-4 rounded-lg items-center border-gray-200 border w-full">
                <section className="px-4 py-3 bg-global-principal text-sm text-white font-medium rounded-s-lg">
                    <FaFilter />
                </section>
                <select name="estado" id="estado"
                    className="px-4 py-3 bg-global-principal flex-1
                    text-sm text-white font-medium
                    border-gray-200 border-l border-r hover:bg-[#464769]
                    focus:z-10 focus:ring-2 focus:ring-white"
                    onChange={filtrarEstado}>
                    <option value="*">Todos</option>
                    <option value="urgente">Urgente</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="solventado">Solventado</option>
                </select>
                <select name="ruta" id="ruta"
                    className="px-4 py-3 bg-global-principal flex-1
                    text-sm text-white font-medium
                    rounded-e-lg hover:bg-[#464769]
                    focus:z-10 focus:ring-2 focus:ring-white"
                    onChange={filtrarRuta}>
                    <option value="*">Todos</option>
                    <option value="A">Ruta A</option>
                    <option value="B">Ruta B</option>
                    <option value="C">Ruta C</option>
                </select>
            </div>
            <div className="flex shadow-sm bg-global-principal mb-4 mt-0 rounded-full border-gray-200 border w-3/4 hover:bg-[#464769]">
                <label htmlFor="codigo" className="px-4 py-4 text-sm text-white font-medium rounded-s-full">
                    <FaSearch />
                </label>
                <input name="codigo" type="text" placeholder="Buscar código contenedor"
                    className="px-4 py-3 bg-transparent flex-1 w-1/4 text-sm text-white font-medium rounded-e-full focus:outline-none"
                    onChange={filtrarContenedor} />
            </div>
        </div>
    );
}

export default function Notificaciones() {
    const [estado, setEstado] = useState("*");
    const [ruta, setRuta] = useState("*");
    const [contenedor, setContenedor] = useState(0);
    const [paginaActual, setPaginaActual] = useState(1);
    const notificacionesPorPagina = 10;

    const notificacionesFiltradas = notificaciones.filter(
        (notificacion) =>
            (estado === "*" || notificacion.estado === estado) &&
            (ruta === "*" || notificacion.ruta === ruta) &&
            (contenedor === 0 || notificacion.contenedor === contenedor)
    );

    const indexUltimaNotificacion = paginaActual * notificacionesPorPagina;
    const indexPrimeraNotificacion = indexUltimaNotificacion - notificacionesPorPagina;
    const notificacionesPagina = notificacionesFiltradas.slice(indexPrimeraNotificacion, indexUltimaNotificacion);

    const totalPaginas = Math.ceil(notificacionesFiltradas.length / notificacionesPorPagina);

    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    return (
        <div className="flex flex-col flex-1 p-5 h-0">
            <h1 className="font-bold text-2xl mb-5">Notificaciones</h1>
            <div className="flex flex-1 max-lg:flex-col h-0">
                <Filtro setEstado={setEstado} setRuta={setRuta} setContenedor={setContenedor} setPaginaActual={setPaginaActual} />
                <div className="flex flex-col flex-1 h-0">
                    <div className="flex flex-col flex-1 md:h-[500px] h-0">
                        <section className="overflow-y-auto h-0 flex-1">
                            {notificacionesPagina.map((notificacion, index) => (
                                <Notificacion key={index} contenedor={notificacion.contenedor} mensaje={notificacion.mensaje} estado={notificacion.estado} />
                            ))}
                        </section>
                        <div className="flex flex-wrap justify-center mt-4">
                            {Array.from({ length: totalPaginas }, (_, i) => (
                                <button key={i} className={`px-3 py-1 m-1 rounded ${paginaActual === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => cambiarPagina(i + 1)}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
