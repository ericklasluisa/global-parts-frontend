import {Tabla, Filtro} from '../components/Dashboard/TablaAdmin';
import { useState } from 'react';

export default function Dashboard() {
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [anio, setAnio] = useState(new Date().getFullYear());
    const [ruta, setRuta] = useState("*");
    const [contenedor, setContenedor] = useState("");
  
    return (
      <div className="w-11/12 mx-auto mb-4">
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