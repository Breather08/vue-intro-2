import { mount } from "@vue/test-utils";
import NoteItem from "@/components/NoteItem.vue";

const message = "Some error";
const info = {
  id: 0,
  title: "",
  textContent: "Some content"
};

describe("NoteItem.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(NoteItem, {
      propsData: {
        info,
        notes: [info],
        API_ID: ""
      },
      data() {
        return {
          isEditing: false,
          message
        };
      }
    });
  });

  it("should initialize correctly", () => {
    expect(wrapper.is(NoteItem)).toBeTruthy();
    expect(wrapper.vm.message).toEqual(message);
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".note-item").html()).toContain("v-card");
    expect(wrapper.find(".v-card").html()).toContain("v-card__title");
    expect(wrapper.find(".v-card").html()).toContain("v-card__text");
    expect(wrapper.find(".edit").exists()).toBeTruthy();
    expect(wrapper.find(".delete").exists()).toBeTruthy();
  });

  it("should check for errors", () => {
    wrapper.vm.editNote(); // open
    expect(wrapper.vm.message).toEqual("No empty fields allowed");
    console.log(wrapper.vm.isEditing);
    const dummyData = { ...info };
    dummyData.title = "Some title";
    wrapper.setProps({ info: dummyData });
    wrapper.vm.editNote();
    console.log(wrapper.vm.isEditing);
    wrapper.vm.editNote();
    console.log(wrapper.vm.isEditing);
    wrapper.vm.editNote();
    console.log(wrapper.vm.isEditing);
    wrapper.vm.editNote();
    console.log(wrapper.vm.isEditing);

    // expect(wrapper.vm.message).toEqual("");
  });

  it("should edit note", () => {
    wrapper.vm.editNote();
  });
});
