/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

function ListItem({ text, href}) {
  return (
    <li className="text-lg font-medium cursor-pointer hover:text-blue-400">
      <a href={href}>{text}</a>
    </li>
  );

}

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <IoMenu className="text-2xl mr-4 cursor-pointer" onClick={toggleMenu} />
      <div className={`${isOpen ? "block" : "hidden"} p-4 w-full`}>
        <ul className="font-medium flex flex-col gap-3 p-4 mt-4 border rounded-lg bg-gray-800 border-gray-700 text-white">
          <ListItem text="Iniciar Ruta" href="/" />
          <ListItem text="Registro en Ruta" href="/" />
          <ListItem text="Finalizar Ruta" href="/" />
        </ul>
      </div>
    </nav>
  );
}

export default NavMenu;
