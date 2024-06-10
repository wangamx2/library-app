import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import DishDashboard from "../../features/books/dashboard/BookDashboard";
import DishForm from "../../features/books/form/BookForm";
import DishDetails from "../../features/books/details/BookDetails";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {element: <RequireAuth />, children: [
        { path: "books", element: <DishDashboard /> },
        { path: "books/:id", element: <DishDetails /> },
        { path: "addbook", element: <DishForm key="add" /> },
        { path: "manage/:id", element: <DishForm key="manage" /> }
      ]},
    
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to='/not-found' /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
