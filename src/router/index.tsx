import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/Layout/AdminLayout";
import AllGamesPage from "../pages/AllGamesPage";
import FavoriteGamesList from "../pages/FavoriteGamesList";
import GamesMargins from "../pages/GamesMargins";
import Merchants from "../pages/Merchants";
import AuthProvider from "../modules/AuthProvider";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <AdminLayout />
      </AuthProvider>
    ),
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
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
