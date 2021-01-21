import { getNotes } from "@/utils/API";
jest.mock("../../src/utils/API.js");

describe("AJAX", () => {
  test("good response", () => {
    getNotes().then((resp) => {
      expect(resp.data.notes.length).toEqual(0);
    });
  });
});
