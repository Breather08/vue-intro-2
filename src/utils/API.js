import axios from "axios";

const URL = "https://api.jsonbin.io/b";
const API_KEY = () => localStorage.getItem("api_key");
const API = axios.create({
  headers: {
    "Content-Type": "application/json",
    "secret-key":
      "$2b$10$bPlHMwt1/Kh6VCkP/kmelu5EmAqHnuTrXt5f2xzDBHiWn8RKHkVdS",
    versioning: false
  }
});

export const getNotes = () =>
  API.get(`${URL}/${API_KEY()}`).catch((err) => {
    throw err;
  });

export const createAPI = (base) =>
  API.post(URL, base)
    .then((resp) => resp.data.id)
    .catch((err) => {
      throw err.response.data;
    });

export const updateNotes = (editedNote) =>
  API.put(`${URL}/${API_KEY()}`, editedNote)
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });
