import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Top = lazy(() =>
  import("~/pages/top").then((module) => ({ default: module.Top })),
);
const Tools = lazy(() =>
  import("~/pages/tools").then((module) => ({ default: module.Tools })),
);
const DutchTreat = lazy(() =>
  import("~/pages/tools/dutch-treat").then((module) => ({
    default: module.DutchTreat,
  })),
);

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/dutch-treat" element={<DutchTreat />} />
    </Routes>
  );
};
