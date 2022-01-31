import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "~/styles/tailwind.css";
import "~/styles/global.css";
import { Router } from "~/router";
import { DefaultLayout } from "./components/layouts/DefaultLayout";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <DefaultLayout>
            <div className="grid min-h-[100vh] place-items-center">
              <div className="text-center text-gray-400">Loading...</div>
            </div>
          </DefaultLayout>
        }
      >
        <Router />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
