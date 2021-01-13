import axios from "axios";

const URL = "https://api.jsonbin.io/b";
let API_ID = "";

const API = axios.create({
  headers: {
    "Content-Type": "application/json",
    "secret-key":
      "$2b$10$bPlHMwt1/Kh6VCkP/kmelu5EmAqHnuTrXt5f2xzDBHiWn8RKHkVdS",
    versioning: false
  }
});

export const getNotes = () =>
  API.get(`${URL}/${API_ID}`)
    .then((resp) => console.log("GET:", resp.data))
    .catch((err) => {
      throw err;
    });

export const addNote = (note) =>
  API.post(URL, note)
    .then((resp) => (API_ID = resp.data.id))
    .catch((err) => {
      throw err.response.data;
    });

export const editNote = (id, editedNote) =>
  API.patch(`${URL}/${id}`, editedNote)
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });

export const deleteNote = (id) =>
  API.delete(`${URL}/${id}`)
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });
