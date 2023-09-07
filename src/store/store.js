import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/uiSlice";
import { calendarSlice } from "./slices/calendarSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth:       authSlice.reducer,
        ui:         uiSlice.reducer,
        calendar:   calendarSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
        //Es para que no serialice las fechas, ya que van en un formato no esperado.
    })
})