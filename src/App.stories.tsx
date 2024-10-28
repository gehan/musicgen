import { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof App> = {
  title: "App",
  component: App,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof App>;

export const StartGame: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Can start game", async () => {
      const startGame = await canvas.findByRole("button", {
        name: "Start game",
      });

      await userEvent.click(startGame);

      await canvas.findByText("Game started");
    });
  },
};
