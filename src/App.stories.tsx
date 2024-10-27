import { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

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

export const Start: Story = {};
