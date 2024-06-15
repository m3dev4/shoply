/*
Ce code configure une API slice avec Redux Toolkit. 
Il définit une fonction de base pour les requêtes HTTP 
en utilisant une URL de base (BASE_URL), et spécifie 
des types de tags pour gérer la mise en cache des données.
 Pour le moment, aucun endpoint spécifique n'est défini. 
 Les endpoints seraient ajoutés dans la fonction endpoints
  pour permettre des opérations comme les requêtes GET, 
  POST, PUT, etc.
*/



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants/index";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Product", "Order", "Category"],
  endpoints: () => ({}),
});
