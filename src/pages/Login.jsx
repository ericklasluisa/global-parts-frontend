import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userInput, setUserInput] = useState("");
  const [userIsValid, setUserIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [auth, setAuth] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userIsValid && passwordIsValid) {
      setAuth(true);
      navigate("/iniciar-ruta");
    } else {
      setAuth(false);
    }
  };

  const validateUserInput = (event) => {
    const regex =
      /^(?:\d{10,15}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return setUserIsValid(regex.test(event.target.value));
  };

  const validatePasswordInput = (event) => {
    event.target.value === ""
      ? setPasswordIsValid(false)
      : setPasswordIsValid(true);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUserInput(value);
    validateUserInput(event);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
    event.target.value === "" && setShowPassword(false);
  };

  return (
    <>
      <div className="mx-7">
        <h2 className="text-center text-global-principal text-3xl font-bold">
          Iniciar Sesión
        </h2>

        <p className="text-center text-base font-semibold text-global-principal/80 my-5">
          Ingrese sus credenciales para continuar
        </p>

        <form className="flex flex-col">
          <div className="flex flex-col">
            <label
              htmlFor="user"
              className="text-global-principal/80 font-semibold text-lg"
            >
              Email / Número de teléfono
            </label>
            <input
              className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 ${
                userIsValid === true
                  ? "ring-green-400 ring"
                  : userIsValid === false
                  ? "ring-red-400 ring"
                  : ""
              }`}
              type="text"
              id="user"
              name="user"
              placeholder="Ingrese su email o número de teléfono"
              value={userInput}
              onChange={handleInputChange}
              onBlur={validateUserInput}
            />
          </div>

          <div className="flex flex-col mt-6">
            <label
              htmlFor="password"
              className="text-global-principal/80 font-semibold text-lg"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className={`bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 my-3 w-full ${
                  passwordIsValid === true
                    ? "ring-green-400 ring"
                    : passwordIsValid === false
                    ? "ring-red-400 ring"
                    : ""
                }`}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••"
                value={passwordValue}
                onChange={handlePasswordChange}
                onBlur={validatePasswordInput}
              />
              {passwordValue ? (
                showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/3 text-global-principal/50 text-2xl cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/3 text-global-principal/50 text-2xl cursor-pointer"
                  />
                )
              ) : (
                ""
              )}
            </div>
          </div>

          {auth ? (
            ""
          ) : (
            <p className="text-red-500 font-semibold text-sm">
              Las credenciales no son correctas. Si olvidaste tu contraseña
              contacta al administrador.
            </p>
          )}

          <button
            className="bg-global-principal/90 text-white font-bold text-lg rounded-lg py-3 mt-10 active:bg-[#1A365D]"
            type="submit"
            onClick={handleSubmit}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
}
