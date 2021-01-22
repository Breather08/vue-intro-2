import { mount } from "@vue/test-utils";
import NoteList from "@/components/NoteList.vue";
import * as req from "@/utils/API";
import { eventBus } from "@/global/eventBus";

jest.mock("../../src/utils/API");

const componentData = {
  data() {
    return {
      notes: [
        {
          id: 0,
          title: "0",
          content: "0"
        },
        {
          id: 1,
          title: "1",
          content: "1"
        },
        {
          id: 2,
          title: "2",
          content: "2"
        }
      ],
      isLoading: true
    };
  }
};

const api_key = "some_random_api_key";

req.updateNotes.mockImplementation((note) => Promise.resolve(note));

req.getNotes.mockImplementation(() =>
  Promise.resolve({
    data: { notes: [{ id: 10, title: "Test title", content: "Test content" }] }
  })
);

req.createAPI.mockImplementation(() => api_key);

describe("NoteList.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(NoteList, componentData);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render correctly", () => {
    expect(wrapper.vm._data.isLoading).toBeFalsy();
    expect(wrapper.find(".note-list").exists()).toBeTruthy();
    expect(wrapper.find(".note-form").exists()).toBeTruthy();
    expect(wrapper.find(".note-item").exists()).toBeTruthy();
  });

  it("should save data on refresh", async () => {
    const refreshed = await mount(NoteList, componentData);
    expect(req.getNotes).toHaveBeenCalledTimes(1);
    expect(refreshed.vm._data.isLoading).toBeFalsy();
  });

  it("should emit add-note correctly", async () => {
    const note = { id: 3, title: "testing add note", content: "content" };
    await eventBus.$emit("add-note", note);
    expect(req.updateNotes).toHaveBeenCalled();
    expect(wrapper.vm._data.notes[0]).toEqual(note);
  });

  it("should emit delete-note correctly", async () => {
    await eventBus.$emit("delete-note", 0);
    expect(req.updateNotes).toHaveBeenCalled();
    expect(wrapper.vm._data.notes.length).toBe(2);
    expect(
      wrapper.vm._data.notes.find((note) => note.id === 0)
    ).toBeUndefined();
  });
});
