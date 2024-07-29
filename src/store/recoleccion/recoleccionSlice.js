import { createSlice } from "@reduxjs/toolkit";

export const recoleccionSlice = createSlice({
  name: "recoleccion",
  initialState: {
    id_recoleccion: 0,
    id_registrador: 0,
    id_ruta: 0,
    id_vehiculo: 0,
    id_viaje: 0,
    km_inicial: 0,
    numero_viaje: 0,
  },
  reducers: {
    iniciarRecoleccion: (state, { payload }) => {
      state.id_recoleccion = payload.id_recoleccion;
      state.id_registrador = payload.id_registrador;
      state.id_ruta = payload.id_ruta;
      state.id_vehiculo = payload.id_vehiculo;
      state.id_viaje = payload.id_viaje;
      state.km_inicial = payload.km_inicial;
      state.numero_viaje = payload.numero_viaje;
    },
    finalizarRecoleccion: (state) => {
      state.id_recoleccion = 0;
      state.id_registrador = 0;
      state.id_ruta = 0;
      state.id_vehiculo = 0;
      state.id_viaje = 0;
      state.km_inicial = 0;
      state.numero_viaje = 0;
    },
    nuevoViaje: (state, { payload }) => {
      state.id_viaje = payload.id_viaje;
      state.numero_viaje = payload.numero_viaje;
    },
  },
});

export const { iniciarRecoleccion, finalizarRecoleccion, nuevoViaje } =
  recoleccionSlice.actions;
