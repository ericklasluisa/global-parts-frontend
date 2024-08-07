import MUIDataTable from "mui-datatables";
import { useCallback, useEffect, useState } from "react";
import ModalRegistrarContenedor from "./ModalRegistrarContenedor";
import { useRegistradorStore } from "../../hooks/useRegistradorStore";
import { iniciarRutaApi } from "../../api/iniciarRutaApi";

function EjemploTablaMUI() {
  const [contenedores, setContenedores] = useState([]);
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [openModalRegistrar, setOpenModalRegistrar] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const recoleccion = useRegistradorStore();

  const { id_recoleccion, id_viaje } = recoleccion;

  useEffect(() => {
    iniciarRutaApi
      .get(
        `/contenedores/ruta/registro/?id_recoleccion=${id_recoleccion}&id_viaje=${id_viaje}`
      )
      .then((response) => {
        setContenedores(response.data);
        setData(response.data);
      });
  }, [id_recoleccion, id_viaje]);

  const filtrarContenedores = useCallback(() => {
    if (filtro === "todos") {
      setData(contenedores);
    } else if (filtro === "pendientes") {
      setData(contenedores.filter((contenedor) => !contenedor.hora_registro));
    } else if (filtro === "recolectados") {
      setData(contenedores.filter((contenedor) => contenedor.hora_registro));
    }
  }, [contenedores, filtro]);

  useEffect(() => {
    filtrarContenedores();
  }, [filtro, filtrarContenedores]);

  const handleFiltroTodos = () => setFiltro("todos");
  const handleFiltroPendientes = () => setFiltro("pendientes");
  const handleFiltroRecolectados = () => setFiltro("recolectados");

  const handleUpdate = (contenedor_id, updatedData) => {
    setContenedores((prevData) =>
      prevData.map((item) =>
        item.id_contenedor === contenedor_id
          ? { ...item, ...updatedData }
          : item
      )
    );
    setSelectedRowIndex(null);
  };

  const options = {
    filterType: "checkbox",
    responsive: "standard",
    elevation: 2,
    download: false,
    print: false,
    selectableRows: "none",
    viewColumns: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [],
    onRowClick: (rowData, rowMeta) => {
      setSelectedRowIndex(rowMeta.dataIndex);
      setOpenModalRegistrar(true);
    },
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente Página",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "RESETEAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Esconder Columnas de la Tabla",
      },
      selectedRows: {
        text: "Fila(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Eliminar Fila(s) Seleccionada",
      },
    },
  };

  const columns = [
    {
      name: "id_contenedor",
      label: "CONT.",
    },
    {
      name: "principal",
      label: "PRINCIPAL",
    },
    {
      name: "transversal",
      label: "TRANSVERSAL",
    },
    {
      name: "sector",
      label: "SECTOR",
    },
    {
      name: "hora_registro",
      label: "HORA",
    },
    {
      name: "porcentaje",
      label: "%",
      options: {
        customBodyRender: (value) => {
          return value ? `${value}%` : "";
        },
      },
    },
    {
      name: "novedades",
      label: "NOVEDAD",
      options: {
        customBodyRender: (value) => {
          return value.length > 0 ? "Con Observación" : "Sin Observación";
        },
      },
    },
  ];

  return (
    <>
      <div className="flex my-5 gap-2">
        <button
          className={`flex flex-col ${
            filtro === "todos"
              ? "bg-global-principal text-white"
              : "border-gray-500 border-2 text-global-principal/50"
          } rounded-xl px-2 py-3 flex-1`}
          onClick={handleFiltroTodos}
        >
          <p className="font-extrabold text-sm">Todos</p>
          <p className="text-xs">
            <span className="font-bold">{contenedores.length}</span> en Total
          </p>
        </button>
        <button
          className={`flex flex-col ${
            filtro === "pendientes"
              ? "bg-global-principal text-white"
              : "border-gray-500 border-2 text-global-principal/50"
          } rounded-xl px-2 py-3 flex-1`}
          onClick={handleFiltroPendientes}
        >
          <p className="text-sm">Pendientes</p>
          <p className="text-xs">
            <span className="font-bold">
              {
                contenedores.filter((contenedor) => !contenedor.hora_registro)
                  .length
              }
            </span>{" "}
            en Total
          </p>
        </button>
        <button
          className={`flex flex-col ${
            filtro === "recolectados"
              ? "bg-global-principal text-white"
              : "border-gray-500 border-2 text-global-principal/50"
          } rounded-xl px-2 py-3 flex-1`}
          onClick={handleFiltroRecolectados}
        >
          <p className="text-sm">Recolectados</p>
          <p className="text-xs">
            <span className="font-bold">
              {
                contenedores.filter((contenedor) => contenedor.hora_registro)
                  .length
              }
            </span>{" "}
            en Total
          </p>
        </button>
      </div>

      <MUIDataTable
        title={"Contenedores"}
        data={data}
        columns={columns}
        options={options}
      />
      {selectedRowIndex !== null && (
        <ModalRegistrarContenedor
          codigo={data[selectedRowIndex].id_contenedor}
          principal={data[selectedRowIndex].principal}
          transversal={data[selectedRowIndex].transversal}
          sector={data[selectedRowIndex].sector}
          hora={data[selectedRowIndex].hora_registro}
          porcentaje={data[selectedRowIndex].porcentaje}
          novedad={data[selectedRowIndex].novedades}
          openModalRegistrar={openModalRegistrar}
          setOpenModalRegistrar={setOpenModalRegistrar}
          onUpdate={handleUpdate}
          rowIndex={selectedRowIndex}
        />
      )}
    </>
  );
}

export default EjemploTablaMUI;
