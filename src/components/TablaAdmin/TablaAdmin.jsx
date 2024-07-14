import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa6";

function Filtro({ mes, anio, setMes, setAnio, setRuta}) {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const anioActual = fechaActual.getFullYear();

  const cambioFecha = (e) => {
    const [year, month] = e.target.value.split("-");
    if((parseInt(year) == anioActual && parseInt(month) > mesActual) || parseInt(year) > anioActual){
      setMes(mesActual);
      setAnio(anioActual);
      window.alert("Elija una fecha menor a la actual")
    } else{
      setMes(parseInt(month));
      setAnio(parseInt(year));
    }
  };

  return (
    <div className="flex shadow-sm mx-auto bg-global-principal m-4 rounded-lg items-center border-gray-200 border w-3/4">
      <section className="px-4 py-3 bg-global-principal
          text-sm text-white font-medium
          rounded-s-lg">
        <FaFilter />
      </section>
      <input name="mes" type="month" value={`${anio}-${mes.toString().padStart(2, "0")}`}
        className="calendario px-4 py-3 bg-global-principal flex-1
        text-sm text-white font-medium
        border-gray-200 border-l border-r
        hover:bg-[#464769]
        focus:z-10 focus:ring-2 focus:ring-white"
        onChange={cambioFecha} />
      <select name="ruta" id="ruta"
        className="calendario px-4 py-3 bg-global-principal flex-1
        text-sm text-white font-medium
        rounded-e-lg
        hover:bg-[#464769]
        focus:z-10 focus:ring-2 focus:ring-white"
        onChange={(e) => setRuta(e.target.value)}>
          <option value="*" selected>Todos</option>
          <option value="A">Ruta A</option>
          <option value="B">Ruta B</option>
          <option value="C">Ruta C</option>
      </select>
    </div>
  )
}

function Tabla({ mes, anio }) {
  const [dias, setDias] = useState([]);

  useEffect(() => {
    var numDias = new Date(anio, mes, 0).getDate();
    const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    var diasTemp = [];
    for (let i = 1; i <= numDias; i++) {
      var indice = new Date(anio, mes - 1, i).getDay();
      diasTemp.push(diasSemana[indice]);
    }
    setDias(diasTemp);
  }, [mes, anio]);

  const numColumnas = 4 + dias.length + 2;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg mx-auto w-11/12 overflow-y-auto h-96">
      <table className="w-auto text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase">
          <tr className="border-b border-gray-200 sticky top-0 z-10">
            <th className="px-6 py-3 max-lg:px-4 bg-gray-600 text-gray-100 sticky left-0 z-20">Cont</th>
            <th className="px-6 py-3 max-lg:px-4 bg-white">Principal</th>
            <th className="px-6 py-3 max-lg:px-4 bg-gray-50">Transversal</th>
            <th className="px-6 py-3 max-lg:px-4 bg-white">Sector</th>
            {dias.map((dia, index) => (
              <th key={index} className={`px-6 py-3 max-lg:px-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {index + 1}
                <br/>
                {dia}
              </th>
            ))}
            <th className="px-6 py-3 max-lg:px-4 bg-gray-600 text-gray-100 sticky right-0 z-20">Prom Mes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 bg-gray-500">
            <td className="px-6 py-3 font-medium text-gray-100 text-left sticky left-0">A</td>
            <td colSpan={numColumnas - 1} className="px-6 py-3"></td>
          </tr>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="px-6 py-3 font-medium text-gray-100 whitespace-nowrap bg-gray-600 sticky left-0">{i}</td>
              <td className="px-6 py-3">{i}</td>
              <td className="px-6 py-3 bg-gray-50">{i}</td>
              <td className="px-6 py-3">{i}</td>
              {dias.map((dia, index) => (
                <td key={index} className={`px-6 py-3 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  {i}
                </td>
              ))}
              <td className="px-6 py-3 font-medium text-gray-100 bg-gray-600 sticky right-0">{i}</td>
            </tr>
          ))}
          <tr className="border-b border-gray-200 bg-gray-500">
            <td className="px-6 py-3 font-medium text-gray-100 text-left sticky left-0">B</td>
            <td colSpan={numColumnas - 1} className="px-6 py-3"></td>
          </tr>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="px-6 py-3 font-medium text-gray-100 whitespace-nowrap bg-gray-600 sticky left-0">{i}</td>
              <td className="px-6 py-3">{i}</td>
              <td className="px-6 py-3 bg-gray-50">{i}</td>
              <td className="px-6 py-3">{i}</td>
              {dias.map((dia, index) => (
                <td key={index} className={`px-6 py-3 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  {i}
                </td>
              ))}
              <td className="px-6 py-3 font-medium text-gray-100 bg-gray-600 sticky right-0">{i}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TablaAdmin() {
  const [mes, setMes] = useState([]);
  const [anio, setAnio] = useState([]);
  const [ruta, setRuta] = useState("*");

  useEffect(() => {
    const fecha = new Date();
    setMes(fecha.getMonth() + 1);
    setAnio(fecha.getFullYear());
  }, []);

  return (
    <>
      <Filtro mes={mes} anio={anio} setMes={setMes} setAnio={setAnio} setRuta={setRuta}/>
      <Tabla mes={mes} anio={anio} />
    </>
  );
}
