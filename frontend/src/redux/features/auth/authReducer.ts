/*
  Ce code crée un slice Redux pour gérer 
  l'authentification d'un utilisateur. L'état initial 
  est défini en fonction des données de localStorage, 
  permettant la persistance de l'état de l'utilisateur
   entre les rechargements de page. Le slice inclut
    deux réducteurs : setCredenials pour mettre à jour 
    les informations de l'utilisateur et les stocker,
     et logout pour réinitialiser l'état 
     d'authentification et effacer les données stockées.
      Les actions et le réducteur sont exportés pour être 
      utilisés dans d'autres parties de l'application.
*/


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredenials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime.toString());
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredenials, logout } = authSlice.actions;

export default authSlice.reducer;
