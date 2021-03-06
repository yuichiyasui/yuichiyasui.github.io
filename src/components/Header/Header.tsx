import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const localtion = useLocation();
  const isTop = localtion.pathname === "/";
  return (
    <header className="sticky top-0 z-50 flex w-full justify-between bg-gradient-to-br from-blue-900/90 via-sky-900/90 to-teal-800/90 py-3 px-5 shadow-sm backdrop-blur-sm">
      <p className="font-bold tracking-wider text-white">
        {isTop ? <span>yuichiyasui</span> : <Link to="/">yuichiyasui</Link>}
      </p>
      <div className="tracking-wider text-white">
        <Link to={"/tools"}>Tools</Link>
      </div>
    </header>
  );
};
