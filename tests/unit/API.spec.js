// import { getNotes, createAPI, updateNotes } from "@/utils/API";
import mockAxios from "axios";
// import { getNotes } from "@/src/utils/API";

jest.mock("../../src/utils/API.js");

describe("AJAX", () => {
  test("good response", async () => {
    mockAxios.post.mockImplementation(() => Promise.resolve({ notes: [] }));
  });
});
