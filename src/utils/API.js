import axios from "axios";

const URL = "https://my-json-server.typicode.com/Breather08/vue-intro-2/db";

const API = axios.create({
  headers: {
    "Content-Type": "application/json"
    // "secret-key": "$2b$10$bPlHMwt1/Kh6VCkP/kmelu5EmAqHnuTrXt5f2xzDBHiWn8RKHkVdS"
  }
});

export const getNotes = () =>
  API.get(URL)
    .then((resp) => console.log("GET:", resp.data))
    .catch((err) => {
      throw err;
    });

export const addNote = (newNote) =>
  API.post(URL, newNote)
    .then((resp) => console.log("POST:", resp.data))
    .catch((err) => {
      throw err;
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
