import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Top = lazy(() =>
  import('~/pages/top').then((module) => ({ default: module.Top })),
);
const Calculation = lazy(() =>
  import('~/pages/tools/calculation').then((module) => ({
    default: module.Calculation,
  })),
);

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/tools/calculation" element={<Calculation />} />
    </Routes>
  );
};
