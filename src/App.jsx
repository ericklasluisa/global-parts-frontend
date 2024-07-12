import "./App.css";
import Login from "./pages/Login";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import IniciarRuta from "./pages/IniciarRuta";
import FinalizarRuta from "./pages/FinalizarRuta";
import FinalizarViaje from "./pages/FinalizarViaje";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const viajes = [
  {
    id: 1,
    numViaje: 1,
    fecha: "2021-09-01",
    tonelajeEntrada: 100,
    tonelajeSalida: 50,
    tonelajeViaje: 50,
    fotoTonelaje: "foto1.jpg",
  },
  {
    id: 2,
    numViaje: 2,
    fecha: "2021-09-02",
    tonelajeEntrada: 200,
    tonelajeSalida: 100,
    tonelajeViaje: 100,
    fotoTonelaje: "foto2.jpg",
  },
  {
    id: 3,
    numViaje: 3,
    fecha: "2021-09-03",
    tonelajeEntrada: 300,
    tonelajeSalida: 150,
    tonelajeViaje: 150,
    fotoTonelaje: "foto3.jpg",
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/iniciar-ruta" element={<IniciarRuta />} />
          <Route path="/finalizar-viaje" element={<FinalizarViaje viajes={viajes}/>} />
          <Route path="/finalizar-ruta" element={<FinalizarRuta />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
