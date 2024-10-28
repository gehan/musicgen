import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { userEvent, within } from "@storybook/test";

import App from "./App";
import { makeStore } from "./store";

const meta: Meta<typeof App> = {
  title: "App",
  component: App,
};

export default meta;

type Story = StoryObj<typeof App>;

export const StartGame: Story = {
  decorators: [
    (Story) => (
      <Provider store={makeStore()}>
        <Story />
      </Provider>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Can start game", async () => {
      const startGame = await canvas.findByRole("button", {
        name: "Start game",
      });
      await userEvent.click(startGame);
    });

    await step("Show first question and score as zero", async () => {
      await canvas.findByText("Score: 0");
      await canvas.findByText("Select chord");
    });
  },
};
