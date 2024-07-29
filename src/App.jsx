import "./App.css";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import TablaAdmin from "./components/TablaAdmin/TablaAdmin";
import Notificaciones from "./components/TablaAdmin/Notificaciones";
import Novedad from "./components/TablaAdmin/Novedad";

function App() {
  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <Header />
      <TablaAdmin />
      {/*<Notificaciones/>
      <Novedad/>*/}
      <Footer />
    </div>
  );
}

export default App;
