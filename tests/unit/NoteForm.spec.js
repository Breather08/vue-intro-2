import { mount } from "@vue/test-utils";
import NoteForm from "@/components/NoteForm.vue";

const message = "Some error";
const componentData = {
  noteData: {
    id: 0,
    title: "",
    textContent: ""
  },
  message,
  API_ID: "",
  MAX_NOTES: 10
};

describe("NoteForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(NoteForm, {
      propsData: {
        notes: []
      },
      data() {
        return componentData;
      }
    });
  });

  it("should initialize correctly", () => {
    expect(wrapper.is(NoteForm)).toBeTruthy();
    expect(wrapper.vm.message).toEqual(message);
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".note-form").html()).toContain("v-card");
    expect(wrapper.find(".v-card > input").exists()).toBeTruthy();
    expect(wrapper.find(".v-card > textarea").exists()).toBeTruthy();
    expect(wrapper.find(".add-note > button").exists()).toBeTruthy();
  });

  it("should check for errors", () => {
    const dummyData = { ...componentData };
    wrapper.vm.clickAdd();
    expect(wrapper.vm.message).toEqual("No empty fields allowed");

    wrapper.setProps({ notes: Array(10) });
    dummyData.noteData.title = "Smth";
    dummyData.noteData.textContent = "Smth";
    wrapper.setData(dummyData);
    wrapper.vm.clickAdd();
    expect(wrapper.vm.message).toEqual("Notes limit exceeded");

    // setProps does not work here, so:
    // wrapper.vm.notes = [];
    // wrapper.vm.clickAdd();
    // expect(wrapper.vm.message).toEqual("");
  });
});
