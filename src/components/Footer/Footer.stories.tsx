import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Footer, Props } from "./Footer";

export default {
  title: "components/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args: Props) => (
  <Footer {...args} />
);
export const Default = Template.bind({});
