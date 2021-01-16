import { mount } from "@vue/test-utils";
import ErrorWindow from "@/components/ErrorWindow.vue";
// import NoteForm from "@/components/NoteForm.vue";
// import NoteItem from "@/components/NoteItem.vue";
// import NoteList from "@/components/NoteList.vue";
// import ProgressBar from "@/components/ProgressBar.vue";

describe("ErrorWindow.vue", () => {
  const wrapper = mount(ErrorWindow);
  it("shows the error window", () => {
    wrapper.setData({ active: false });
    console.log(wrapper.element.style._values.transform);
    wrapper.vm.$emit("show-message", "test message");

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.element.style._values.transform).toEqual("translate(350px)");
    expect(wrapper.emitted("show-message")[0]).toEqual(["test message"]);
    expect(wrapper.vm.active).toBe(false);
  });
});
