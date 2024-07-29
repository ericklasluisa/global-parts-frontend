import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { recoleccionSlice } from "./recoleccion/recoleccionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    recoleccion: recoleccionSlice.reducer,
  },
});
