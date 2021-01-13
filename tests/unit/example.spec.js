import { shallowMount } from "@vue/test-utils";
import ErrorWindow from "@/components/ErrorWindow.vue";
// import NoteForm from "@/components/NoteForm.vue";
// import NoteItem from "@/components/NoteItem.vue";
// import NoteList from "@/components/NoteList.vue";
// import ProgressBar from "@/components/ProgressBar.vue";

describe("ErrorWindow.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(ErrorWindow, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
