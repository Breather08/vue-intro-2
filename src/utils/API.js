import axios from "axios";

const URL = "https://api.jsonbin.io/b/5ffdd5c58aa7af359da92624/5";

const API = axios.create({
  headers: {
    "Content-Type": "application/json",
    "secret-key": "$2b$10$bPlHMwt1/Kh6VCkP/kmelu5EmAqHnuTrXt5f2xzDBHiWn8RKHkVdS"
  }
});

export const getNotes = () =>
  API.get(URL)
    .then((resp) => console.log("GET:", resp.data))
    .catch((err) => {
      throw err;
    });

export const addNote = (note) =>
  API.post(URL, note)
    .then((resp) => console.log("POST:", resp.data))
    .catch((err) => {
      throw err;
    });

export const editNote = (id, edited) =>
  API.patch(`${URL}/${id}`, edited)
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
