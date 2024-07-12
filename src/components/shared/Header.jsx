import { useState } from "react";
import NavMenu from "./NavMenu";
import { IoMenu } from "react-icons/io5";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="w-full flex flex-col">
        <div className="flex justify-between py-5 bg-global-principal w-full text-white ">
          <h1 className="ml-4 text-xl">Global Parts</h1>
          <IoMenu
            className="text-2xl mr-4 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <NavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
    </>
  );
}
