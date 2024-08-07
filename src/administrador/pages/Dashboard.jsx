import {Tabla, Filtro } from '../components/Dashboard/TablaAdmin';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [ruta, setRuta] = useState("*");
  const [contenedor, setContenedor] = useState("");

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