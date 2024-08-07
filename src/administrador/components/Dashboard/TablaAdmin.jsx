import { useState, useEffect } from "react";

import { porcentajesApi } from "../../api/porcentajesApi";
import { rutasApi } from "../../api/rutasApi";

import { FaFilter, FaSearch } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

import {BotonExportarAdmin, DownloadAdminLoader} from "./Exportar";

export function Filtro({ mes, anio, setMes, setAnio, setRuta, setContenedor }) {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const anioActual = fechaActual.getFullYear();
  const [rutas, setRutas] = useState([]);

  const getRutas = async () => {
    rutasApi.get("/rutas/").then((response) => {
      setRutas(response.data);
    });
  }

  useEffect(() => {
    getRutas();
  },[]);

  const cambioFecha = (e) => {
    const [year, month] = e.target.value.split("-");
    if (
      (parseInt(year) == anioActual && parseInt(month) > mesActual) ||
      parseInt(year) > anioActual
    ) {
      setMes(mesActual);
      setAnio(anioActual);
      window.alert("Elija una fecha menor a la actual");
    } else {
      setMes(parseInt(month));
      setAnio(parseInt(year));
    }
  };

  return (
    <>
      <div className="flex shadow-sm mx-auto bg-global-principal m-4 rounded-lg items-center border-gray-200 border w-full">
        <section
          className="px-4 py-3 bg-global-principal
            text-sm text-white font-medium
            rounded-s-lg"
        >
          <FaFilter />
        </section>
        <input
          name="mes"
          type="month"
          value={`${anio}-${mes.toString().padStart(2, "0")}`}
          className="calendario px-4 py-3 bg-global-principal flex-1
          text-sm text-white font-medium
          border-gray-200 border-l border-r
          hover:bg-[#464769]
          focus:z-10 focus:ring-2 focus:ring-white"
          onChange={cambioFecha}
        />
        <select
          name="ruta"
          id="ruta"
          className="calendario px-4 py-3 bg-global-principal flex-1
          text-sm text-white font-medium
          rounded-e-lg
          hover:bg-[#464769]
          focus:z-10 focus:ring-2 focus:ring-white"
          onChange={(e) => setRuta(e.target.value)}
        >
          <option value="*" selected>
            Todos
          </option>
          {rutas.map((ruta) => (
            <option key={ruta.id_ruta} value={ruta.nombre_ruta}>
              Ruta {ruta.nombre_ruta}
            </option>
          ))}
        </select>
      </div>
      <div className="flex">

        <div className="flex shadow-sm bg-global-principal mb-4 mt-0 rounded-full border-gray-200 border w-1/4 max-lg:w-3/4 hover:bg-[#464769]">
          <label
            htmlFor="codigo"
            className="px-4 py-4
              text-sm text-white font-medium
              rounded-s-full"
          >
            <FaSearch />
          </label>
          <input
            name="codigo"
            type="text"
            placeholder="Buscar código contenedor"
            className="px-4 py-3 bg-transparent flex-1 w-1/4
            text-sm text-white font-medium
            rounded-e-full
            focus:outline-none"
            onChange={(e) => setContenedor(e.target.value)}
          />
        </div>

        <BotonExportarAdmin mes={mes} anio={anio} />
      </div>
    </>
  );
}

export function Tabla({ mes, anio, ruta, contenedor }) {
  const [dias, setDias] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [contenedores, setContenedores] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPorcentajes = async () => {
    porcentajesApi
      .get(`/reporte/${mes}/${anio}`)
      .then((response) => {
        const { rutas: rutasApi } = response.data;

        // Procesar datos de la API
        const contenedoresApi = [];
        const registrosApi = [];

        rutasApi.forEach((ruta) => {
          ruta.contenedores.forEach((contenedor) => {
            contenedoresApi.push({
              id: contenedor.id_contenedor,
              principal: contenedor.principal,
              transversal: contenedor.transversal,
              sector: contenedor.sector
            });

            registrosApi.push({
              ruta: ruta.id_ruta,
              contenedor: contenedor.id_contenedor,
              porcentajes: contenedor.registros.map((registro) => ({
                dia: registro.fecha_registro.split("T")[0], // Asumiendo que el formato es YYYY-MM-DD
                porcentaje: registro.porcentaje
              }))
            });
          });
        });

        setRutas(rutasApi.map(r => ({ id: r.id_ruta, nombre: r.nombre_ruta })));
        setContenedores(contenedoresApi);
        setReportes(registrosApi);
        setLoading(false);
      });
  }

  useEffect(() => {
    //Setear el loading
    setReportes([]);
    setLoading(true);

    // Obtener fecha actual
    var numDias = new Date(anio, mes, 0).getDate();
    const diasSemana = ["D", "L", "M", "M", "J", "V", "S"];
    var diasTemp = [];
    for (let i = 1; i <= numDias; i++) {
      var indice = new Date(anio, mes - 1, i).getDay();
      diasTemp.push(diasSemana[indice]);
    }
    setDias(diasTemp);

    // Obtener registros de la API
    getPorcentajes();
  }, [mes, anio]);

  const numColumnas = 4 + dias.length + 2;

  const registrosFiltrados = reportes
    .map((registro) => {
      const porcentajesMes = registro.porcentajes.filter((p) => {
        const [year, month, day] = p.dia.split("-");
        return parseInt(month) === mes && parseInt(year) === anio;
      });
      return { ...registro, porcentajes: porcentajesMes };
    })
    .filter(
      (registro) =>
        (contenedor === "" || registro.contenedor.toString() === contenedor) &&
        (ruta === "*" || rutas.find((r) => r.id === registro.ruta)?.nombre === ruta)
    );

  return (
    <div className="flex flex-col overflow-x-auto shadow-md rounded-lg w-full overflow-y-auto h-0 flex-1 mb-4">
      <table className="w-auto text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase">
          <tr className="border-b border-gray-200 sticky top-0 z-10">
            <th className="px-6 py-3 bg-gray-600 text-gray-100 sticky left-0 z-20">
              Cont
            </th>
            <th className="px-6 py-3 bg-white">Principal</th>
            <th className="px-6 py-3 bg-gray-50">Transversal</th>
            <th className="px-6 py-3 bg-white">Sector</th>
            {dias.map((dia, index) => (
              <th
                key={index}
                className={`px-6 py-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                {index + 1}
                <br />
                {dia}
              </th>
            ))}
            <th className="px-6 py-3 bg-gray-600 text-gray-100 sticky right-0 z-20">
              Prom Mes
            </th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((rutaMap) =>
            registrosFiltrados.some((registro) => registro.ruta === rutaMap.id) ? (
              <>
                <tr
                  className="border-b border-gray-200 bg-gray-500"
                  key={rutaMap.id}
                >
                  <td className="px-6 py-3 font-medium text-gray-100 text-left sticky left-0">
                    {rutaMap.nombre}
                  </td>
                  <td colSpan={numColumnas - 1} className="px-6 py-3"></td>
                </tr>
                {registrosFiltrados
                  .filter((registro) => registro.ruta === rutaMap.id)
                  .map((registro, i) => {
                    const contenedor = contenedores.find(
                      (c) => c.id === registro.contenedor
                    );
                    const promedioMes =
                      registro.porcentajes.reduce(
                        (acc, p) => acc + p.porcentaje,
                        0
                      ) / registro.porcentajes.length || 0;

                    return (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="px-6 py-3 font-medium text-gray-100 whitespace-nowrap bg-gray-600 sticky left-0">
                          {registro.contenedor}
                        </td>
                        <td className="px-6 py-3 truncate max-w-xs">
                          {contenedor.principal}
                        </td>
                        <td className="px-6 py-3 bg-gray-50 truncate max-w-xs">
                          {contenedor.transversal}
                        </td>
                        <td className="px-6 py-3 truncate max-w-xs">
                          {contenedor.sector}
                        </td>
                        {dias.map((dia, index) => {
                          const porcentajeDia =
                            registro.porcentajes.find(
                              (p) =>
                                parseInt(p.dia.split("-")[2]) === index + 1
                            )?.porcentaje || 0;
                          return (
                            <td
                              key={index}
                              className={`px-6 py-3 ${index % 2 === 0 ? "bg-gray-50" : ""
                                }`}
                            >
                              {porcentajeDia}
                            </td>
                          );
                        })}
                        <td className="px-6 py-3 font-medium text-gray-100 bg-gray-600 sticky right-0">
                          {promedioMes.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
              </>
            ) : null
          )}
        </tbody>
      </table>
      {loading && (
        <div className="flex flex-col gap-5 flex-1 justify-center items-center w-full">
          <p className="text-xl text-gray-500">
            Cargando Datos
          </p>
          <div className="flex flex-row gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      )}
    </div>
  );
}