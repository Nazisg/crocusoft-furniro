import React from "react";
import { Routes, Route } from "react-router-dom";
import RoutesData from "../db/RoutersData";
export default function Routers() {
  return (
    <div>
      <Routes>
        {RoutesData.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}
