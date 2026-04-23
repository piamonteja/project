import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import WatchListPage from "../pages/WatchListPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "watchlist",
        element: <WatchListPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);