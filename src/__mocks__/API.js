export const getNotes = () =>
  Promise.resolve(() => ({ data: { notes: [], notes_max: 10 } }));

// export const createAPI = (note) =>
//   API.post(URL, note)
//     .then((resp) => resp.data.id)
//     .catch((err) => {
//       throw err.response.data;
//     });

// export const updateNotes = (editedNote) =>
//   API.put(`${URL}/${API_KEY()}`, editedNote)
//     .then((resp) => resp.data)
//     .catch((err) => {
//       throw err;
//     });
