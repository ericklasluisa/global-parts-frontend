import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import {porcentajesApi} from "../../api/porcentajesApi";

const registros = [
  {
    ruta: 1,
    contenedor: 1,
    porcentajes: [
      { dia: "01/08/2024", porcentaje: 100 },
      { dia: "02/08/2024", porcentaje: 40 },
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
  { id: 1, nombre_ruta: "A" },
  { id: 2, nombre_ruta: "B" },
  { id: 3, nombre_ruta: "C" },
  { id: 4, nombre_ruta: "D" },
  { id: 5, nombre_ruta: "E" },
  { id: 6, nombre_ruta: "F" },
  { id: 7, nombre_ruta: "G" },
  { id: 8, nombre_ruta: "H" },
  { id: 9, nombre_ruta: "I" },
  { id: 10, nombre_ruta: "J" },
  { id: 11, nombre_ruta: "K" },
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

export function Filtro({ mes, anio, setMes, setAnio, setRuta, setContenedor }) {
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
            <option key={ruta.id} value={ruta.nombre_ruta}>
              Ruta {ruta.nombre_ruta}
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

export function Tabla({ mes, anio, ruta, contenedor }) {
  const [dias, setDias] = useState([]);
  const [reportes, setReportes] = useState([]);
  //const [rutas, setRutas] = useState([]);
  /*const [registros, setRegistros] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [contenedores, setContenedores] = useState([]);*/

  useEffect(() => {
    // Obtener los días del mes
    const numDias = new Date(anio, mes, 0).getDate();
    const diasSemana = ["D", "L", "M", "M", "J", "V", "S"];
    const diasTemp = [];
    for (let i = 1; i <= numDias; i++) {
      const indice = new Date(anio, mes - 1, i).getDay();
      diasTemp.push(diasSemana[indice]);
    }
    setDias(diasTemp);

    // Etraer los reportes de la Api
    porcentajesApi
    .get(
      `/reporte/${mes}?anio=${anio}`
    )
    .then((response) => {
      setReportes(response.data);
      
      //setRutas(response.data.rutas);
    });
    //setRutas(reportes.rutas);

    //setRegistros(reportes.map((ruta) => reporte.registros).flat());
    //console.log(rutas);
    //console.log(registros);
  }, [mes, anio]);

  console.log(reportes);
  console.log(rutas);
  console.log(contenedores);
  console.log(registros);

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
        (contenedor === "" || registro.contenedor.toString() === contenedor) &&
        (ruta === "*" || rutas.find((r) => r.id === registro.ruta)?.nombre_ruta === ruta)
    );

  const columns = [
    {
      name: "Cont",
      options: {
        setCellProps: () => ({
          style: { position: "sticky", left: 0, backgroundColor: "#999" },
        }),
      },
    },
    { name: "Principal" },
    { name: "Transversal" },
    { name: "Sector" },
    ...dias.map((dia, index) => ({
      name: `${index + 1}\n${dia}`,
      options: {
        customHeadRender: ({ i, ...column }) => (
          <th key={i} {...column}>
            <div style={{ textAlign: 'center', fontWeight: 'normal' }}>
              <div>{index + 1}</div>
              <div>{dia}</div>
            </div>
          </th>
        ),
      },
    })),
    {
      name: "Prom",
      options: {
        setCellProps: () => ({ style: { position: "sticky", right: 0, backgroundColor: "#999" } }),
      },
    },
  ];

  const data = [];
  const rutaRows = new Set();

  rutas.forEach((rutaMap) => {
    if (registrosFiltrados.some((registro) => registro.ruta === rutaMap.id)) {
      const rutaIndex = data.length;
      data.push([`${rutaMap.nombre_ruta}`, "", "", "", ...Array(dias.length).fill(""), ""]);
      rutaRows.add(rutaIndex);
      
      registrosFiltrados
        .filter((registro) => registro.ruta === rutaMap.id)
        .forEach((registro) => {
          const contenedor = contenedores.find(
            (c) => c.id === registro.contenedor
          );
          const promedioMes =
            registro.porcentajes.reduce((acc, p) => acc + p.porcentaje, 0) /
              registro.porcentajes.length || 0;

          const row = [
            registro.contenedor,
            contenedor?.principal || "",
            contenedor?.transversal || "",
            contenedor?.sector || "",
            ...dias.map((dia, index) => {
              const porcentajeDia =
                registro.porcentajes.find(
                  (p) => parseInt(p.dia.split("/")[0]) === index + 1
                )?.porcentaje || 0;
              return porcentajeDia;
            }),
            promedioMes.toFixed(2),
          ];

          data.push(row);
        });
    }
  });

  const options = {
    search: false,
    filter: false,
    viewColumns: false,
    selectableRows: "none",
    rowsPerPage: 10,
    responsive: "standard",
    setRowProps: (row, dataIndex) => {
      if (rutaRows.has(dataIndex)) {
        return {
          style: { backgroundColor: "#999", fontWeight: "bold" },
        };
      }
      return {};
    },
  };

  return (
    <MUIDataTable
      title={"Tabla de Datos"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}