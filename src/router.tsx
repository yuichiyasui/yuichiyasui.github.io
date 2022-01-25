import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Top = lazy(() =>
  import('~/pages/top').then((module) => ({ default: module.Top })),
);

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
    </Routes>
  );
};
