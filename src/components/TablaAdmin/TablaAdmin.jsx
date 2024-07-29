import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const registros = [
  {
    ruta: 1,
    contenedor: 1,
    porcentajes: [
      { dia: "01/07/2024", porcentaje: 100 },
      { dia: "02/07/2024", porcentaje: 40 },
      { dia: "04/07/2024", porcentaje: 40 },
    ],
  },
  {
    ruta: 1,
    contenedor: 2,
    porcentajes: [
      { dia: "01/07/2024", porcentaje: 100 },
      { dia: "02/07/2024", porcentaje: 40 },
    ],
  },
  {
    ruta: 2,
    contenedor: 3,
    porcentajes: [
      { dia: "01/07/2024", porcentaje: 100 },
      { dia: "02/07/2024", porcentaje: 40 },
    ],
  },
  {
    ruta: 2,
    contenedor: 4,
    porcentajes: [
      { dia: "01/07/2024", porcentaje: 100 },
      { dia: "02/07/2024", porcentaje: 40 },
    ],
  },
  {
    ruta: 3,
    contenedor: 5,
    porcentajes: [
      { dia: "01/07/2024", porcentaje: 100 },
      { dia: "02/07/2024", porcentaje: 40 },
    ],
  },
  {
    ruta: 3,
    contenedor: 6,
    porcentajes: [
      { dia: "01/07/2024", porcentaje: 100 },
      { dia: "02/07/2024", porcentaje: 40 },
    ],
  },
  {
    ruta: 3,
    contenedor: 7,
    porcentajes: [
      { dia: "01/07/2024", porcentaje: 100 },
      { dia: "02/07/2024", porcentaje: 40 },
    ],
  },
];

const rutas = [
  { id: 1, nombre: "A" },
  { id: 2, nombre: "B" },
  { id: 3, nombre: "C" },
  { id: 4, nombre: "D" },
  { id: 5, nombre: "E" },
  { id: 6, nombre: "F" },
  { id: 7, nombre: "G" },
  { id: 8, nombre: "H" },
  { id: 9, nombre: "I" },
  { id: 10, nombre: "J" },
  { id: 11, nombre: "K" },
];

const contenedores = [
  {
    id: 1,
    principal: "Toronto",
    transversal: "Matanzas",
    sector: "La Peninsula",
  },
  { id: 2, principal: "Toronto", transversal: "Otawa", sector: "La Peninsula" },
  {
    id: 3,
    principal: "Gustavo Lemos Ramirez, Escuela",
    transversal: "Dr. Pedro José Arteta",
    sector: "Magdalena",
  },
  {
    id: 4,
    principal: "Gustavo Lemos Ramirez, Escuela",
    transversal: "Dr. Pedro José Arteta",
    sector: "Magdalena",
  },
  {
    id: 5,
    principal: "Av. Víctor Hugo",
    transversal: "Batalla de Tarqui",
    sector: "Cdla. El Deportista",
  },
  {
    id: 6,
    principal: "Av. Víctor Hugo",
    transversal: "Batalla de Tarqui",
    sector: "Cdla. El Deportista",
  },
  {
    id: 7,
    principal: "Av. Víctor Hugo",
    transversal: "Batalla de Tarqui",
    sector: "Cdla. El Deportista",
  },
];

function Filtro({ mes, anio, setMes, setAnio, setRuta, setContenedor }) {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const anioActual = fechaActual.getFullYear();

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
            <option key={ruta.id} value={ruta.nombre}>
              Ruta {ruta.nombre}
            </option>
          ))}
        </select>
      </div>
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
    </>
  );
}

function Tabla({ mes, anio, ruta, contenedor }) {
  const [dias, setDias] = useState([]);

  useEffect(() => {
    var numDias = new Date(anio, mes, 0).getDate();
    const diasSemana = ["D", "L", "M", "M", "J", "V", "S"];
    var diasTemp = [];
    for (let i = 1; i <= numDias; i++) {
      var indice = new Date(anio, mes - 1, i).getDay();
      diasTemp.push(diasSemana[indice]);
    }
    setDias(diasTemp);
  }, [mes, anio]);

  const numColumnas = 4 + dias.length + 2;

  const registrosFiltrados = registros
    .map((registro) => {
      const porcentajesMes = registro.porcentajes.filter((p) => {
        const [day, month, year] = p.dia.split("/");
        return parseInt(month) === mes && parseInt(year) === anio;
      });
      return { ...registro, porcentajes: porcentajesMes };
    })
    .filter(
      (registro) =>
        contenedor === "" || registro.contenedor.toString() === contenedor
    );

  return (
    <div className="overflow-x-auto shadow-md rounded-lg w-full overflow-y-auto h-0 flex-1 mb-4">
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
                className={`px-6 py-3 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
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
          {rutas.map(
            (rutaMap) =>
              (ruta === "*" || ruta === rutaMap.nombre) && (
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
                                  parseInt(p.dia.split("/")[0]) === index + 1
                              )?.porcentaje || 0;
                            return (
                              <td
                                key={index}
                                className={`px-6 py-3 ${
                                  index % 2 === 0 ? "bg-gray-50" : ""
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
              )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function TablaAdmin() {
  const [mes, setMes] = useState([]);
  const [anio, setAnio] = useState([]);
  const [ruta, setRuta] = useState("*");
  const [contenedor, setContenedor] = useState("");

  useEffect(() => {
    const fecha = new Date();
    setMes(fecha.getMonth() + 1);
    setAnio(fecha.getFullYear());
  }, []);

  return (
    <div className="flex flex-col h-0 flex-1 w-11/12 mx-auto">
      <Filtro
        mes={mes}
        anio={anio}
        setMes={setMes}
        setAnio={setAnio}
        setRuta={setRuta}
        setContenedor={setContenedor}
      />
      <Tabla mes={mes} anio={anio} ruta={ruta} contenedor={contenedor} />
    </div>
  );
}
