import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { GuessChord } from "./GuessChord";

const meta: Meta<typeof GuessChord> = {
  title: "Guess Chord",
  component: GuessChord,
};

export default meta;

type Story = StoryObj<typeof GuessChord>;

export const CMajor: Story = {
  args: {
    keyLetter: "C",
    type: "major",
    onComplete: fn(),
  },
};

export const CMajorCorrect: Story = {
  ...CMajor,
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step("Select c major", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "C" }));
      await userEvent.click(canvas.getByRole("button", { name: "major" }));
    });

    await step("Shows c major answer", async () => {
      await canvas.findByText("C major");
    });

    await step("Shows correct icon", async () => {
      await canvas.findByTestId("CheckCircleIcon");
    });

    await step("Handler called", async () => {
      expect(args.onComplete).toHaveBeenCalledWith(true);
    });
  },
};

export const CMajorIncorrect: Story = {
  ...CMajor,
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step("Select c minor", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "C" }));
      await userEvent.click(canvas.getByRole("button", { name: "minor" }));
    });

    await step("Shows c major answer", async () => {
      await canvas.findByText("C major");
    });

    await step("Shows incorrect icon", async () => {
      await canvas.findByTestId("CancelIcon");
    });

    await step("Handler called", async () => {
      expect(args.onComplete).toHaveBeenCalledWith(false);
    });
  },
};
