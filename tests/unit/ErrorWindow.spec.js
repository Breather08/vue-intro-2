import { mount } from "@vue/test-utils";
import ErrorWindow from "@/components/ErrorWindow.vue";
import { eventBus } from "@/eventBus";

const message = "Some error";

describe("ErrorWindow.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ErrorWindow, {
      data() {
        return {
          message,
          active: false
        };
      }
    });
  });

  it("should initialize correctly", () => {
    expect(wrapper.is(ErrorWindow)).toBeTruthy();
    expect(wrapper.vm.message).toEqual(message);
    expect(wrapper.vm.active).toBeFalsy();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".warning-logo").html()).toContain("<svg");
    expect(wrapper.find(".warning-msg > span").text()).toEqual(message);
  });

  it("should should handle click with correct output and timing", () => {
    jest.useFakeTimers();

    const testMsg = "Test message";
    eventBus.$emit("show-message", testMsg);
    wrapper.vm.showMessage();
    expect(wrapper.vm.message).toEqual(testMsg);

    expect(wrapper.vm.active).toBeTruthy();
    setTimeout(() => {
      expect(wrapper.vm.active).toBeFalsy();
    }, 2000);

    jest.runAllTimers();
  });
});
