import { GitHubIcon } from "./GitHub";
import { TwitterIcon } from "./Twitter";

export default {
  title: "components/icons",
};

const Template = () => {
  return (
    <ul className="flex">
      <li className="mr-4">
        <GitHubIcon />
      </li>
      <li>
        <TwitterIcon />
      </li>
    </ul>
  );
};

export const IconList = Template.bind({});
