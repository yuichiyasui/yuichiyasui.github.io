import { ComponentMeta } from "@storybook/react";
import { DefaultLayout } from "./DefaultLayout";

export default {
  title: "components/layouts/DefaultLayout",
  component: DefaultLayout,
} as ComponentMeta<typeof DefaultLayout>;

const Template = () => {
  return (
    <DefaultLayout>
      <div className="text-center">コンテンツ</div>
    </DefaultLayout>
  );
};

export const Default = Template.bind({});
