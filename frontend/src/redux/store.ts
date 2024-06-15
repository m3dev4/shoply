/*
Ce code configure un store Redux avec Redux Toolkit, 
en intégrant un slice API (apiSlice) et un reducer 
d'authentification (authReducer). Il ajoute également 
les middlewares nécessaires pour gérer les requêtes API 
et active les DevTools Redux pour le développement. 
Les listeners de cache sont configurés pour gérer 
des fonctionnalités avancées comme le refetching 
automatique des données.
*/

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authReducer";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
