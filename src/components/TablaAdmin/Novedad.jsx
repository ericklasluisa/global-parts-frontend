import { FaPlus } from 'react-icons/fa';
import MUIDataTable from "mui-datatables";
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

//Novedades
const novedadContenedor = {
    contenedor: 1,
    novedades: [1, 2, 3],
    estado: 'pendiente',
    solventado: false
};

const novedades = [
    { id: 1, novedad: "Grafiteado" },
    { id: 2, novedad: "Pedal Roto" },
    { id: 3, novedad: "Faltante" }
];

const repuestosList = [
    { id: 1, repuesto: "Pintura" },
    { id: 2, repuesto: "Pedal" },
    { id: 3, repuesto: "Tornillos" }
];

export default function Novedad() {
    //Tabla
    const columns = ["Repuesto", "Cantidad"];
    const [repuestos, setRepuestos] = useState([]);
    const [selectedRepuesto, setSelectedRepuesto] = useState('');
    const [cantidad, setCantidad] = useState('');

    const options = {
        elevation: 0,
        download: false,
        print: false,
        search: false,
        filter: false,
        viewColumns: false,
        pagination: false,
        responsive: "scrollMaxHeight",
        onRowsDelete: (rowsDeleted) => {
            const deleteIndex = rowsDeleted.data.map(d => d.dataIndex);
            const newRepuestos = repuestos.filter((r, i) => !deleteIndex.includes(i));
            setRepuestos(newRepuestos);
        }
    };

    const handleAddRepuesto = (e) => {
        e.preventDefault();
        if (selectedRepuesto && cantidad) {
            const repuestoName = repuestosList.find(r => r.id === parseInt(selectedRepuesto)).repuesto;
            setRepuestos([...repuestos, { item: repuestoName, cantidad }]);
            setSelectedRepuesto('');
            setCantidad('');
        }
    };

    const getTheme = () => createTheme({
        palette: {
            background: {
                paper: "#1A1A27",
            },
            mode: 'dark'
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        padding: '10px 4px'
                    },
                    body: {
                        padding: '7px 15px',
                        color: '#e2e8f0'
                    }
                }
            }

        }

    });

    return (
        <div className="flex-1 w-3/4 mx-auto py-4 max-lg:w-10/12">
            <h1 className="font-bold text-2xl mb-5">Contenedor {novedadContenedor.contenedor.toString().padStart(2, "0")}</h1>
            <form className="flex flex-col">

                <div className="flex flex-col">
                    <label
                        htmlFor="novedad"
                        className="text-global-principal/80 font-semibold text-lg"
                    >
                        Novedades:
                    </label>
                    <div className="flex max-lg:flex-col gap-x-3">
                        {novedadContenedor.novedades.map((novedad) => (
                            <input
                                key={novedad}
                                className="bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 flex-1"
                                type="text"
                                name="novedad"
                                placeholder={novedades.find((n) => n.id === novedad).novedad}
                                disabled
                            />
                        ))}
                    </div>
                </div>

                <div className="flex mt-6 items-center">
                    <input
                        id="solventado"
                        className="bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2"
                        type="checkbox"
                        name="solventado"
                    />
                    <label
                        htmlFor="solventado"
                        className="text-global-principal/80 font-semibold text-lg ml-2"
                    >
                        Solventado
                    </label>
                </div>

                <div className="flex flex-col mt-6">
                    <label
                        htmlFor="solucion"
                        className="text-global-principal/80 font-semibold text-lg"
                    >
                        Solución:
                    </label>
                    <textarea
                        rows="4"
                        className="bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 flex-1"
                        name="solucion"
                    />

                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="repuesto"
                        className="text-global-principal/80 font-semibold text-lg"
                    >
                        Repuestos:
                    </label>
                    <div className="flex gap-x-6 max-lg:gap-x-1">
                        <select
                            className="bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 flex-1"
                            value={selectedRepuesto}
                            onChange={(e) => setSelectedRepuesto(e.target.value)}
                        >
                            <option value="" disabled>Seleccione un repuesto</option>
                            {repuestosList.map((repuesto) => (
                                <option key={repuesto.id} value={repuesto.id}>
                                    {repuesto.repuesto}
                                </option>
                            ))}
                        </select>
                        <input
                            className="bg-[#F1F4F9] border-[#D8D8D8] border rounded-lg p-2 mt-3 w-1/3"
                            type="number"
                            name="cantidad"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            placeholder="Cantidad"
                        />
                        <button
                            className="bg-global-principal/90 text-white font-bold text-lg rounded-lg p-2 mt-3"
                            onClick={handleAddRepuesto}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className="mt-6 rounded-lg overflow-hidden">
                    <ThemeProvider theme={getTheme()}>
                        <MUIDataTable
                            title={"Repuestos"}
                            data={repuestos.map(r => [r.item, r.cantidad])}
                            columns={columns}
                            options={options}
                        />
                    </ThemeProvider>
                </div>

                <button
                    className="bg-global-principal/90 text-white font-bold text-lg rounded-lg py-3 mt-10 active:bg-[#1A365D]"
                    type="submit"
                    onClick={(e) => e.preventDefault()}
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
}
