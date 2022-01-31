import "../src/styles/global.css";
import "../src/styles/tailwind.css";

import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((Story) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Story />
    </MemoryRouter>
  );
});
