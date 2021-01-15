import { shallowMount } from "@vue/test-utils";
import ErrorWindow from "@/components/ErrorWindow.vue";
// import NoteForm from "@/components/NoteForm.vue";
// import NoteItem from "@/components/NoteItem.vue";
// import NoteList from "@/components/NoteList.vue";
// import ProgressBar from "@/components/ProgressBar.vue";

describe("ErrorWindow.vue", () => {
  it("shows the error window", () => {
    const wrapper = shallowMount(ErrorWindow);

    wrapper.vm.$emit("message", "test message");

    expect(wrapper.emitted().message).toBe("test message");
  });
});
