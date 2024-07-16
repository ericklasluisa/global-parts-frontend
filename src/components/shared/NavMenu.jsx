/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
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
        className="text-2xl font-medium cursor-pointer hover:text-blue-300 md:text-sm md:whitespace-nowrap lg:text-base"
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const usuarioDB = {
    nombre: "Juan Perez",
    rol: "Registrador",
  };
  return (
    <nav>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-global-principal z-50 md:hidden`}
      >
        <div className="font-medium flex flex-col gap-3 p-4 border rounded-b-lg bg-global-principal border-global-principal text-white items-center">
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-8xl" />
            <p className="text-gray-400 mt-2 text-md font-bold">
              {usuarioDB.nombre}
            </p>
            <p className="text-gray-400 mt-1 text-sm">{usuarioDB.rol}</p>
            <div className="text-white rounded flex items-center">
              <IoIosLogOut className="text-xl" />
              <button
                className="text-sm font-medium p-2"
                onClick={() => {
                  // TODO: Lógica para cerrar sesión
                  console.log("Cerrar sesión");
                  setIsDropdownOpen(false);
                }}
              >
                Cerrar sesión
              </button>
            </div>
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
      <div className="md:flex bg-global-principal h-full items-center pr-10 text-white hidden">
        <ul className="flex gap-5 text-center mr-5">
          {paginas.map((pagina) => (
            <ListItem
              key={pagina.text}
              text={pagina.text}
              path={pagina.path}
              setIsOpen={setIsOpen}
            />
          ))}
        </ul>
        <div className="relative flex items-center gap-4" ref={dropdownRef}>
          <FaUserCircle className="text-5xl" />
          <div className="flex flex-col justify-center items-center w-auto text-center">
            <p className="text-gray-400 text-sm font-bold">
              {usuarioDB.nombre}
            </p>
            <p className="text-gray-400 text-sm">{usuarioDB.rol}</p>
          </div>
          <IoIosArrowDropdown
            className="text-2xl cursor-pointer"
            onClick={handleDropdownClick}
          />
          {isDropdownOpen && (
            <div className="absolute top-full right-0 bg-white text-black rounded shadow-md p-2 w-full flex items-center">
              <IoIosLogOut className="text-xl" />
              <button
                className="text-sm font-medium hover:bg-gray-100 p-2 w-full text-left"
                onClick={() => {
                  // TODO: Lógica para cerrar sesión
                  console.log("Cerrar sesión");
                  setIsDropdownOpen(false);
                }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
