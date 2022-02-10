import { Link } from "react-router-dom";
import { DefaultLayout } from "~/components/layouts/DefaultLayout";

export const Tools = () => {
  return (
    <DefaultLayout>
      <h1 className="mb-8 text-center text-4xl font-bold">Tools</h1>
      <ul>
        <li className="text-center">
          <Link
            to={"/tools/dutch-treat"}
            className="font-bold text-blue-500 hover:opacity-70"
          >
            割り勘計算ツール
          </Link>
        </li>
      </ul>
    </DefaultLayout>
  );
};
