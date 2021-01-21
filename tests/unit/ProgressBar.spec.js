import { mount } from "@vue/test-utils";
import ProgressBar from "@/components/ProgressBar.vue";
import { eventBus } from "@/global/eventBus";

describe("ProgressBar.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ProgressBar, {
      data() {
        return {
          amount: -1,
          MAX_NOTES: 10
        };
      }
    });
  });

  it("should initialize correctly", () => {
    expect(wrapper.is(ProgressBar)).toBeTruthy();
    expect(wrapper.vm.amount).toEqual(-1);
    expect(wrapper.vm.MAX_NOTES).toEqual(10);
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".progress").exists()).toBeTruthy();
    expect(wrapper.find(".chart").exists()).toBeTruthy();
  });

  it("should change amount properly", () => {
    eventBus.$emit("send-notes", 2);
    expect(wrapper.vm._data.amount).toEqual(2);
  });
});
