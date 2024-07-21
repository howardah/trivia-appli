// import type Vue from "vue"
import { config, flushPromises, mount, VueWrapper } from "@vue/test-utils";
import TriviaCard from "@/components/TriviaCard.vue";
import TriviaCardPlaceholder from "~/components/TriviaCard/Placeholder.vue";
import FilterButton from "~/components/Filter/Button.vue";
import IconClose from "~/components/Icon/Close.vue";
import { TriviaQuestion } from "~/@types/trivia-question";
import { categoryColors } from "~/assets/dictionaries";
import index from "~/pages/index.vue";

// Because I wanted to take advantage of Nuxt's auto import of components
// I had to do something a little 'hacky' feeling to get the tests to accept
// the nested components which weren't explicitly imported on their parent
// component. The solution I used, can be found here:
// https://github.com/nuxt/components/issues/58#issuecomment-904230080

describe("TriviaCard.vue", () => {
  const testQuestion: TriviaQuestion = new TriviaQuestion(
    {
      category: "General Knowledge",
      type: "boolean",
      difficulty: "medium",
      question: "Cucumbers are usually more than 90% water.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    1
  );

  test("Test that Trivia Card Rendors Boolean Question", () => {
    const wrapper: VueWrapper<any> = mount(TriviaCard, {
      props: {
        question: testQuestion,
      },
    });
    expect(wrapper.text()).toMatch(/True or False:/);
  });

  test("Test that Trivia Card Flips When Clicked", async () => {
    const wrapper: VueWrapper<any> = mount(TriviaCard, {
      props: {
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
    const wrapper: VueWrapper<any> = mount(TriviaCardPlaceholder);
    expect(wrapper.vm).toBeTruthy();
  });
});

describe("FilterButton.vue", () => {
  const iconCloseRegEx =
    /<svg[\w\W]*?>[\w\W]*<circle[\w\W]*?<\/circle>[\w\W]*<polygon[\w\W]*?><\/polygon>[\w\W]*?<\/svg>/;

  test("Test that the filter button renders the X icon when active", () => {
    const wrapper: VueWrapper<any> = mount(FilterButton, {
      props: { active: true },
    });
    expect(wrapper.html()).toMatch(iconCloseRegEx);
  });

  test("Test that the filter button doesn't render the X icon when inactive", () => {
    const wrapper: VueWrapper<any> = mount(FilterButton, {
      props: { active: false },
    });
    expect(wrapper.html()).not.toMatch(iconCloseRegEx);
  });
});

describe("IconClose.vue", () => {
  Object.values(categoryColors).forEach((color) => {
    test(`Test that ${color} render correctly`, () => {
      const wrapper: VueWrapper<any> = mount(IconClose, {
        props: {
          hue: color,
          tint: 600,
        },
      });
      expect(wrapper.html()).toContain(`text-${color}-600`);
      expect(wrapper.html()).toContain(`group-hover:text-${color}-700`);
    });
  });

  test(`Test that tint of 50 renders as 100 for hover`, () => {
    const wrapper: VueWrapper<any> = mount(IconClose, {
      props: {
        hue: "fuchsia",
        tint: 50,
      },
    });
    expect(wrapper.html()).toContain(`text-fuchsia-50`);
    expect(wrapper.html()).toContain(`group-hover:text-fuchsia-100`);
  });
});

const mockRoute = {
  query: {
    categories:
      "general-knowledge,entertainment,science,mythology,sports,geography,history,politics,arts,celebrities,animals,vehicles",
  },
};
const routePushMock = jest.fn(() => mockRoute);
const routerPushMock = jest.fn(() => ({}));

jest.mock("vue-router", () => ({
  useRoute: () => mockRoute,
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

jest.mock("../assets/calls.ts", () =>
  jest.requireActual("../assets/__mocks__/calls.ts")
);

describe("index.vue", () => {
  // beforeEach(() => {
  //   jest.resetAllMocks();
  // });

  test(`Test that trivia questions are displayed`, async () => {
    const wrapper: VueWrapper<any> = mount(index);
    // Wait for calls to be made
    await flushPromises();
    expect(wrapper.html()).toContain("Who played Sgt. Gordon Elias");
  });
});

const triviaApi: string = "https://opentdb.com/api.php";
const triviaApiSession: string =
  "https://opentdb.com/api_token.php?command=request";
