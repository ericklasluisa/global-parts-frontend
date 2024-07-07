import { useState, useEffect } from "react";

export default function TablaAdmin() {
  const [dias, setDias] = useState([]);
  const [mes, setMes] = useState([]);
  const [anio, setAnio] = useState([]);
  useEffect(() => {
    const fecha = new Date();
    setMes(fecha.getMonth() + 1);
    setAnio(fecha.getFullYear());
    var numDias = new Date(anio, mes, 0).getDate()
    const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    var diasTemp = []; 
    for (let i = 1; i <= numDias; i++) {
      var indice = new Date(anio, mes - 1, i).getDay();
      diasTemp.push(diasSemana[indice]);
      setDias(diasTemp);
    }
  }, []);

  return(
  <div className="overflow-x-auto w-10/12 m-auto">
    <table className="table-auto border-collapse border border-neutral-500">
      <thead>
        <tr>
          <th className="bg-neutral-400 border border-neutral-500">Cont</th>
          <th className="bg-neutral-400 border border-neutral-500">Principal</th>
          <th className="bg-neutral-400 border border-neutral-500">Transversal</th>
          <th className="bg-neutral-400 border border-neutral-500">Sector</th>
          {dias.map((dia, index) => (
            <th key={index} className="bg-neutral-400 border border-neutral-500">{index + 1} {dia}</th>
          ))}
          <th className="bg-neutral-400 border-neutral-500 sticky right-0">Prom Mes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-neutral-500">1</td>
          <td className="border border-neutral-500">1</td>
          <td className="border border-neutral-500">1</td>
          <td className="border border-neutral-500">1</td>
          {dias.map((dia, index) => (
            <td key={index} className="border border-neutral-500">1</td>
          ))}
          <td className="bg-white border border-neutral-500 sticky right-0">1</td>
        </tr>
        <tr>
          <td className="border border-neutral-500">2</td>
          <td className="border border-neutral-500">2</td>
          <td className="border border-neutral-500">2</td>
          <td className="border border-neutral-500">2</td>
          {dias.map((dia, index) => (
            <td key={index} className="border border-neutral-500">2</td>
          ))}
          <td className="bg-white border border-neutral-500 sticky right-0">2</td>
        </tr>
        <tr>
          <td className="border border-neutral-500">3</td>
          <td className="border border-neutral-500">3</td>
          <td className="border border-neutral-500">3</td>
          <td className="border border-neutral-500">3</td>
          {dias.map((dia, index) => (
            <td key={index} className="border border-neutral-500">3</td>
          ))}
          <td className="bg-white border border-neutral-500 sticky right-0">3</td>
        </tr>
      </tbody>
    </table>
  </div>);
}
