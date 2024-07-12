/* eslint-disable react/prop-types */
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const paginas = [
  {
    text: "Iniciar Ruta",
    path: "/iniciar-ruta",
  },
  {
    text: "Registro en Ruta",
    path: "/ruta",
  },
  {
    text: "Finalizar Viaje",
    path: "/finalizar-viaje",
  },
  {
    text: "Finalizar Ruta",
    path: "/finalizar-ruta",
  },
];

function ListItem({ text, path, setIsOpen }) {
  return (
    <>
      <li
        className="text-2xl font-medium cursor-pointer hover:text-blue-400"
        onClick={() => setIsOpen(false)}
      >
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to={path}
        >
          {text}
        </NavLink>
      </li>
    </>
  );
}

function NavMenu({ isOpen, setIsOpen }) {
  const usuarioDB = {
    nombre: "Juan Perez",
    rol: "Registrador",
  };
  return (
    <nav>
      <div className={`${isOpen ? "block w-screen" : "hidden"} w-full`}>
        <div className="font-medium flex flex-col gap-3 p-4 border rounded-b-lg bg-global-principal border-global-principal text-white items-center">
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-8xl" />
            <p className="text-gray-400 mt-2 text-md font-bold">
              {usuarioDB.nombre}
            </p>
            <p className="text-gray-400 mt-1 text-sm">{usuarioDB.rol}</p>
          </div>
          <hr className="w-full border border-gray-400 mt-3" />
          <ul className="flex flex-col gap-8 my-5 text-center">
            {paginas.map((pagina) => (
              <ListItem
                key={pagina.text}
                text={pagina.text}
                path={pagina.path}
                setIsOpen={setIsOpen}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;