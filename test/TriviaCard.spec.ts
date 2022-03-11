import { mount, Wrapper } from "@vue/test-utils";
import TriviaCard from "@/components/TriviaCard.vue";
import TriviaCardPlaceholder from "~/components/TriviaCard/Placeholder.vue";
import FilterButton from "~/components/Filter/Button.vue";
import {
  initialiseTriviaQuestion,
  TriviaQuestion,
} from "~/@types/trivia-question";

// Because I wanted to take advantage of Nuxt's auto import of components
// I had to do something a little 'hacky' feeling to get the tests to accept
// the nested components which weren't explicitly imported on their parent
// component. The solution I used, can be found here:
// https://github.com/nuxt/components/issues/58#issuecomment-904230080

describe("TriviaCard.vue", () => {
  const testQuestion: TriviaQuestion = initialiseTriviaQuestion({
    id: 1,
    category: "General Knowledge",
    type: "boolean",
    difficulty: "medium",
    question: "Cucumbers are usually more than 90% water.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  });

  test("Test that Trivia Card Rendors Boolean Question", () => {
    const wrapper: Wrapper<TriviaCard, Element> = mount(TriviaCard, {
      propsData: {
        question: testQuestion,
      },
    });
    expect(wrapper.text()).toMatch(/True or False:/);
  });

  test("Test that Trivia Card Flips When Clicked", async () => {
    const wrapper: Wrapper<TriviaCard, Element> = mount(TriviaCard, {
      propsData: {
        question: testQuestion,
      },
    });

    const flipCard = wrapper.find(".flip-card");
    await flipCard.trigger("click");
    expect(wrapper.html()).toMatch(/flipped/);
    await flipCard.trigger("click");
    expect(wrapper.html()).not.toMatch(/flipped/);
  });
});

describe("TriviaCardPlaceholder.vue", () => {
  test("Test that Trivia Card Placeholder Rendors", () => {
    const wrapper: Wrapper<TriviaCardPlaceholder, Element> = mount(
      TriviaCardPlaceholder
    );
    expect(wrapper.vm).toBeTruthy();
  });
});

describe("FilterButton.vue", () => {
  const iconCloseRegEx =
    /<svg[\w\W]*?>[\w\W]*<circle[\w\W]*?<\/circle>[\w\W]*<polygon[\w\W]*?><\/polygon>[\w\W]*?<\/svg>/;

  test("Test that the filter button renders the X icon when active", () => {
    const wrapper: Wrapper<FilterButton, Element> = mount(FilterButton, {
      propsData: { active: true },
    });
    expect(wrapper.html()).toMatch(iconCloseRegEx);
  });

  test("Test that the filter button doesn't render the X icon when inactive", () => {
    const wrapper: Wrapper<FilterButton, Element> = mount(FilterButton, {
      propsData: { active: false },
    });
    expect(wrapper.html()).not.toMatch(iconCloseRegEx);
  });
});
