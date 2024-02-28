import React from "react";
import {
  BrowserRouter,
  Navigate,
  RouteObject,
  useRoutes,
} from "react-router-dom";

const SnakeGameView = React.lazy(() => import("@Pages/snake-game"));

const routes: RouteObject[] = [
  {
    path: "/snake-game",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SnakeGameView />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/snake-game" replace />,
  },
];

const Router = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
