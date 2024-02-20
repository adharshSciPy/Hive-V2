import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlices from "../slices/state/authSlices";
import { apiSlice } from "../slices/api/apiSlice";

const store = configureStore({
    reducer: {
        auth: authSlices,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(apiSlice.middleware)
    }
});

setupListeners(store.dispatch)

export default store;