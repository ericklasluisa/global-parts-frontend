import "./App.css";
import Login from "./pages/Login";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import IniciarRuta from "./pages/IniciarRuta";
import FinalizarRuta from "./pages/FinalizarRuta";
import FinalizarViaje from "./pages/FinalizarViaje";

function App() {
  return (
    <>
      <Header />
      {/* <Login /> */}
      {/* <IniciarRuta /> */}
      <FinalizarViaje />
      {/* <FinalizarRuta /> */}
      <Footer />
    </>
  );
}

export default App;
