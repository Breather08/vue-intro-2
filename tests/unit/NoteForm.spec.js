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

  const clickAdd = () => {
    wrapper.find(".add-note").trigger("click");
  };

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
    clickAdd();
    expect(wrapper.vm.message).toEqual("No empty fields allowed");

    dummyData.noteData.textContent = "Smth";
    dummyData.noteData.title = "Smth";
    wrapper.setData(dummyData);
    clickAdd();
    expect(wrapper.vm.message).toEqual("");

    dummyData.noteData.textContent = "Smth";
    dummyData.noteData.title = "Smth";
    wrapper.setData(dummyData);
    wrapper.setProps({ notes: Array(10) });
    clickAdd();
    expect(wrapper.vm.message).toEqual("Notes limit exceeded");
  });
});
