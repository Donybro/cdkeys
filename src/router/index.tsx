import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/Layout/AdminLayout";
import AllGamesPage from "../pages/AllGamesPage";
import FavoriteGamesList from "../pages/FavoriteGamesList";
import GamesMargins from "../pages/GamesMargins";
import Merchants from "../pages/Merchants";

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <AllGamesPage />,
      },
      {
        path: "/favorite-games",
        element: <FavoriteGamesList />,
      },
      {
        path: "/games-margins",
        element: <GamesMargins />,
      },
      {
        path: "/merchants",
        element: <Merchants />,
      },
    ],
  },
]);

export default router;
