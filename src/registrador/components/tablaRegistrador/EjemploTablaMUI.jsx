import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import ModalRegistrarContenedor from "./ModalRegistrarContenedor";
import { useRegistradorStore } from "../../hooks/useRegistradorStore";
import { iniciarRutaApi } from "../../api/iniciarRutaApi";

function EjemploTablaMUI() {
  const [contenedores, setContenedores] = useState([]);
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
      });
  }, [id_recoleccion, id_viaje]);

  const handleUpdate = (index, updatedData) => {
    setContenedores((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, ...updatedData } : item
      )
    );
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

  const data = contenedores;
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
      <MUIDataTable
        title={"Contenedores"}
        data={data}
        columns={columns}
        options={options}
      />
      {selectedRowIndex !== null && (
        <ModalRegistrarContenedor
          codigo={contenedores[selectedRowIndex].id_contenedor}
          principal={contenedores[selectedRowIndex].principal}
          transversal={contenedores[selectedRowIndex].transversal}
          sector={contenedores[selectedRowIndex].sector}
          hora={contenedores[selectedRowIndex].hora_registro}
          porcentaje={contenedores[selectedRowIndex].porcentaje}
          novedad={contenedores[selectedRowIndex].novedades}
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
