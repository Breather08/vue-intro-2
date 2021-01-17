import { createLocalVue, mount } from "@vue/test-utils";
import ErrorWindow from "@/components/ErrorWindow.vue";
import { eventBus } from "@/eventBus";
import Vue from "vue";
import vuetify from "./plugins/vuetify";
// import NoteForm from "@/components/NoteForm.vue";
// import NoteItem from "@/components/NoteItem.vue";
// import NoteList from "@/components/NoteList.vue";
// import ProgressBar from "@/components/ProgressBar.vue";

const message = "Some error";
const evtBus = new Vue({ vuetify });
const GlobalPlugins = {
  install(v) {
    v.prototype.$eventhub = evtBus;
  }
};
const localVue = createLocalVue();
localVue.prototype.$eventhub = createLocalVue();
localVue.use(GlobalPlugins);

describe("ErrorWindow.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ErrorWindow, {
      localVue,
      data() {
        return {
          message,
          active: false
        };
      },
      methods: {
        showMessage: () => {}
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

  it("should change error message", async () => {
    await eventBus.trigger("show-message");
    console.log(wrapper.emitted());
    // expect(wrapper.vm.$data).toHaveBeenCalled();
  });
});
