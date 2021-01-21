import { mount } from "@vue/test-utils";
import NoteItem from "@/components/NoteItem.vue";
import { updateNotes } from "@/utils/API";

const message = "Some error";
jest.mock("../../src/utils/API");

describe("NoteItem.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(NoteItem, {
      propsData: {
        info: {
          id: 0,
          title: "Some title0",
          textContent: "Some content0"
        },
        notes: [
          {
            id: 0,
            title: "Some title0",
            textContent: "Some content0"
          },
          {
            id: 1,
            title: "Some title1",
            textContent: "Some content1"
          },
          {
            id: 2,
            title: "Some title2",
            textContent: "Some content2"
          }
        ]
      },
      data() {
        return {
          isEditing: false,
          message
        };
      }
    });
    updateNotes.mockImplementation(() =>
      Promise.resolve({ title: "Test title", content: "Test content" })
    );
  });

  const clickEdit = () => {
    wrapper.find(".edit").trigger("click");
  };

  const clickDelete = () => {
    wrapper.find(".delete").trigger("click");
  };

  it("should initialize correctly", () => {
    expect(wrapper.is(NoteItem)).toBeTruthy();
    expect(wrapper.vm.message).toEqual(message);
    expect(wrapper.vm._props.notes[0]).toEqual(wrapper.vm._props.info);
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".note-item").html()).toContain("v-card");
    expect(wrapper.find(".note-item").html()).toContain("side-options");
    expect(wrapper.find(".v-card > input").exists()).toBeTruthy();
    expect(wrapper.find(".v-card > textarea").exists()).toBeTruthy();
    expect(wrapper.find(".edit").exists()).toBeTruthy();
    expect(wrapper.find(".delete").exists()).toBeTruthy();
  });

  it("should trigger delete button", () => {
    wrapper.setData({ isEditing: true });
    expect(wrapper.vm._data.isEditing).toBeTruthy();
    clickDelete();
    expect(wrapper.vm._data.isEditing).toBeFalsy();
  });

  it("should trigger edit button", async () => {
    expect(wrapper.vm._data.isEditing).toBeFalsy();
    await clickEdit();
    expect(wrapper.vm._data.isEditing).toBeTruthy();
    await clickEdit();
    expect(wrapper.vm._data.message).toEqual("");
    expect(wrapper.vm._data.isEditing).toBeFalsy();
    await updateNotes().then((resp) => {
      expect(resp.title).toEqual("Test title");
    });
    expect(updateNotes).toHaveBeenCalled();
  });

  it("should send error message", () => {
    wrapper.setProps({
      info: {
        id: 0,
        title: "",
        textContent: ""
      }
    });
    clickEdit();
    expect(wrapper.vm._data.message).toEqual("No empty fields allowed");
  });
});
