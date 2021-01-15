import { mount } from "@vue/test-utils";
import ErrorWindow from "@/components/ErrorWindow.vue";
// import NoteForm from "@/components/NoteForm.vue";
// import NoteItem from "@/components/NoteItem.vue";
// import NoteList from "@/components/NoteList.vue";
// import ProgressBar from "@/components/ProgressBar.vue";

describe("ErrorWindow.vue", () => {
  it("shows the error window", () => {
    const wrapper = mount(ErrorWindow);

    // expect(wrapper.)

    wrapper.vm.$emit("message", "test message");

    console.log(mount(ErrorWindow).html());

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.emitted().message[0][0]).toBe("test message");
  });
});
