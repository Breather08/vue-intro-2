import axios from "axios";

const URL = "https://api.jsonbin.io/b";

const API = axios.create({
  headers: {
    "Content-Type": "application/json",
    "secret-key":
      "$2b$10$bPlHMwt1/Kh6VCkP/kmelu5EmAqHnuTrXt5f2xzDBHiWn8RKHkVdS",
    versioning: false
  }
});

export const getNotes = (API_ID) =>
  API.get(`${URL}/${API_ID}`)
    .then((resp) => console.log("GET:", resp.data, "API ID:", API_ID))
    .catch((err) => {
      throw err;
    });

export const createNote = (note) =>
  API.post(URL, note)
    .then((resp) => resp.data.id)
    .catch((err) => {
      throw err.response.data;
    });

export const editNote = (editedNote, API_ID) =>
  API.put(`${URL}/${API_ID}`, editedNote)
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });

export const deleteNote = (API_ID) =>
  API.delete(`${URL}/${API_ID}`)
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });
