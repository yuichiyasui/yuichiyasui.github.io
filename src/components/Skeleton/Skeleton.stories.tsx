import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Props, Skeleton } from "./Skeleton";

export default {
  title: "components/Skeleton",
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args: Props) => {
  return <Skeleton {...args} />;
};

export const Square = Template.bind({});
Square.args = {
  className: "w-20 h-20",
};
export const Circle = Template.bind({});
Circle.args = {
  className: "w-20 h-20 rounded-full",
};
