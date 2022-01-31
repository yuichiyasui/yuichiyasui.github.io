import { ReactNode } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

type Props = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Header />
      <main className="mx-5 py-12 lg:mx-auto lg:w-[1024px]">{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
};
